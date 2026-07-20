/* Shared render helpers built on top of data.js catalogs. */
(function (global) {
  function isLightSwatch(token) {
    return /ivory|daffodil|fff|white/i.test(token);
  }

  function swatchDotsHTML(colors, size) {
    size = size || 11;
    return colors.map(function (c) {
      var css = c.indexOf('--') === 0 ? 'var(' + c + ')' : c;
      var cls = isLightSwatch(c) ? ' light' : '';
      return '<span class="' + cls.trim() + '" style="width:' + size + 'px;height:' + size + 'px;background:' + css + '"></span>';
    }).join('');
  }

  function tileCardHTML(tile) {
    return '' +
      '<a href="tile.html?tile=' + tile.slug + '" class="tile-card">' +
        '<div class="tile-image" style="background:var(' + tile.swatch + ')"><span>Photo coming soon</span></div>' +
        '<span class="tile-name">' + tile.name + '</span>' +
        '<span class="eyebrow">' + tile.spec + '</span>' +
        '<div class="swatch-dots">' + swatchDotsHTML(tile.swatches) + '</div>' +
      '</a>';
  }

  function portfolioCardHTML(project) {
    /* Tags render as spans, never links: this card is itself an <a>,
       and nested anchors are invalid HTML (browsers silently mangle them). */
    var tags = project.tiles.map(function (name) {
      return '<span class="tag">' + name + '</span>';
    }).join('');
    return '' +
      '<a href="portfolio-detail.html?project=' + project.slug + '" class="portfolio-card">' +
        '<div class="portfolio-image" style="background:var(' + project.swatch + ')"></div>' +
        '<div class="portfolio-body">' +
          '<span class="portfolio-title">' + project.project + '</span>' +
          '<span class="portfolio-location">' + project.location + '</span>' +
          '<div class="portfolio-tags">' + tags + '</div>' +
        '</div>' +
      '</a>';
  }

  function blogCardHTML(post) {
    return '' +
      '<a href="blog-article.html?post=' + post.slug + '" class="blog-card">' +
        '<div class="blog-card-media" style="background:var(' + post.swatch + ')"></div>' +
        '<div class="blog-date">' + post.date + '</div>' +
        '<h2>' + post.title + '</h2>' +
        '<p>' + post.excerpt + '</p>' +
      '</a>';
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  global.grhamIsLightSwatch = isLightSwatch;
  global.grhamSwatchDotsHTML = swatchDotsHTML;
  global.grhamTileCardHTML = tileCardHTML;
  global.grhamPortfolioCardHTML = portfolioCardHTML;
  global.grhamBlogCardHTML = blogCardHTML;
  global.grhamGetQueryParam = getQueryParam;
})(window);
