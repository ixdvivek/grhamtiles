/* Tile customizer — perspective-warp math.
   Canvas2D only supports affine transforms (setTransform takes a 2x3
   matrix), not full projective ones, so a true 4-corner perspective
   warp needs two pieces:
     1. A homography (8-parameter projective transform) mapping the
        flat source rectangle onto the 4 user-placed corners.
     2. Since that mapping isn't affine, the source texture is warped
        by subdividing it into a fine grid and drawing each small cell
        as two triangles, each with its OWN exact affine transform
        (3 point correspondences always admit an exact affine map).
        Small enough triangles make the piecewise-affine result
        visually indistinguishable from a true projective warp.
   Kept dependency-free and unit-testable without a DOM. */
(function (global) {
  /* Solves the 8x8 linear system for a homography mapping 4 source
     points to 4 destination points. Returns [a,b,c,d,e,f,g,h] such that
       X = (a*x + b*y + c) / (g*x + h*y + 1)
       Y = (d*x + e*y + f) / (g*x + h*y + 1)
     or null if the 4 points are degenerate (collinear / duplicate). */
  function computeHomography(src, dst) {
    var A = [];
    var b = [];
    for (var i = 0; i < 4; i++) {
      var x = src[i].x, y = src[i].y, X = dst[i].x, Y = dst[i].y;
      A.push([x, y, 1, 0, 0, 0, -x * X, -y * X]);
      b.push(X);
      A.push([0, 0, 0, x, y, 1, -x * Y, -y * Y]);
      b.push(Y);
    }
    var h = solveLinearSystem(A, b);
    if (!h) return null;
    return h; // [a,b,c,d,e,f,g,h]
  }

  function applyHomography(h, x, y) {
    var w = h[6] * x + h[7] * y + 1;
    return {
      x: (h[0] * x + h[1] * y + h[2]) / w,
      y: (h[3] * x + h[4] * y + h[5]) / w
    };
  }

  /* Gaussian elimination with partial pivoting. A is N x N, b is N x 1.
     Returns the solution array or null if the system is singular. */
  function solveLinearSystem(A, b) {
    var n = A.length;
    var M = A.map(function (row, i) { return row.concat([b[i]]); });

    for (var col = 0; col < n; col++) {
      var pivotRow = col;
      for (var r = col + 1; r < n; r++) {
        if (Math.abs(M[r][col]) > Math.abs(M[pivotRow][col])) pivotRow = r;
      }
      if (Math.abs(M[pivotRow][col]) < 1e-10) return null; // singular
      if (pivotRow !== col) { var tmp = M[col]; M[col] = M[pivotRow]; M[pivotRow] = tmp; }

      for (var r2 = col + 1; r2 < n; r2++) {
        var factor = M[r2][col] / M[col][col];
        for (var c = col; c <= n; c++) M[r2][c] -= factor * M[col][c];
      }
    }

    var x = new Array(n).fill(0);
    for (var i2 = n - 1; i2 >= 0; i2--) {
      var sum = M[i2][n];
      for (var j = i2 + 1; j < n; j++) sum -= M[i2][j] * x[j];
      x[i2] = sum / M[i2][i2];
    }
    return x;
  }

  /* Exact affine transform (2x3 matrix, row-major [a,b,c,d,e,f]) taking
     src triangle points to dst triangle points:
       X = a*x + b*y + c
       Y = d*x + e*y + f
     Used per-triangle in the mesh warp below. Returns null if the
     source triangle is degenerate (zero area). */
  function triangleAffine(s0, s1, s2, d0, d1, d2) {
    var det = (s1.x - s0.x) * (s2.y - s0.y) - (s2.x - s0.x) * (s1.y - s0.y);
    if (Math.abs(det) < 1e-9) return null;

    var x1 = solveLinearSystem(
      [[s0.x, s0.y, 1], [s1.x, s1.y, 1], [s2.x, s2.y, 1]],
      [d0.x, d1.x, d2.x]
    );
    var x2 = solveLinearSystem(
      [[s0.x, s0.y, 1], [s1.x, s1.y, 1], [s2.x, s2.y, 1]],
      [d0.y, d1.y, d2.y]
    );
    if (!x1 || !x2) return null;
    return [x1[0], x1[1], x1[2], x2[0], x2[1], x2[2]];
  }

  /* Draws `sourceCanvas` (a W x H flat texture) warped so its 4 corners
     land on `dstCorners` (TL, TR, BR, BL, in destination-canvas pixel
     coordinates), via a `gridSize` x `gridSize` mesh of homography-
     projected vertices, each cell rendered as two affine-warped
     triangles. `destCtx` is drawn into directly; caller handles
     clearing/save-restore around the whole thing if needed. */
  function warpTextureToQuad(destCtx, sourceCanvas, dstCorners, gridSize) {
    var W = sourceCanvas.width, H = sourceCanvas.height;
    var srcQuad = [{ x: 0, y: 0 }, { x: W, y: 0 }, { x: W, y: H }, { x: 0, y: H }];
    var H_ = computeHomography(srcQuad, dstCorners);
    if (!H_) return false;

    // Precompute the projected position of every grid vertex.
    var verts = [];
    for (var row = 0; row <= gridSize; row++) {
      verts.push([]);
      for (var col = 0; col <= gridSize; col++) {
        var sx = (col / gridSize) * W;
        var sy = (row / gridSize) * H;
        verts[row].push({ src: { x: sx, y: sy }, dst: applyHomography(H_, sx, sy) });
      }
    }

    function drawTri(a, b, c) {
      var m = triangleAffine(a.src, b.src, c.src, a.dst, b.dst, c.dst);
      if (!m) return;
      destCtx.save();
      destCtx.beginPath();
      destCtx.moveTo(a.dst.x, a.dst.y);
      destCtx.lineTo(b.dst.x, b.dst.y);
      destCtx.lineTo(c.dst.x, c.dst.y);
      destCtx.closePath();
      destCtx.clip();
      destCtx.transform(m[0], m[3], m[1], m[4], m[2], m[5]);
      destCtx.drawImage(sourceCanvas, 0, 0);
      destCtx.restore();
    }

    for (var r = 0; r < gridSize; r++) {
      for (var c2 = 0; c2 < gridSize; c2++) {
        var v00 = verts[r][c2], v10 = verts[r][c2 + 1];
        var v01 = verts[r + 1][c2], v11 = verts[r + 1][c2 + 1];
        drawTri(v00, v10, v11);
        drawTri(v00, v11, v01);
      }
    }
    return true;
  }

  global.grhamGeometry = {
    computeHomography: computeHomography,
    applyHomography: applyHomography,
    solveLinearSystem: solveLinearSystem,
    triangleAffine: triangleAffine,
    warpTextureToQuad: warpTextureToQuad
  };
})(typeof window !== 'undefined' ? window : globalThis);
