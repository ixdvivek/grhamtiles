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

  /* Real Sanity photos win when present; otherwise fall back to the flat
     oxide-swatch color placeholder used everywhere real photography is
     still pending. */
  function mediaStyle(swatch, imageUrl) {
    return imageUrl
      ? "background-image:url('" + imageUrl + "');background-size:cover;background-position:center"
      : 'background:var(' + swatch + ')';
  }

  function tileCardHTML(tile) {
    var comingSoon = tile.image ? '' : '<span>Photo coming soon</span>';
    return '' +
      '<a href="tile.html?tile=' + tile.slug + '" class="tile-card">' +
        '<div class="tile-image" style="' + mediaStyle(tile.swatch, tile.image) + '">' + comingSoon + '</div>' +
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
        '<div class="portfolio-image" style="' + mediaStyle(project.swatch, project.image) + '"></div>' +
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
        '<div class="blog-card-media" style="' + mediaStyle(post.swatch, post.image) + '"></div>' +
        '<div class="blog-date">' + post.date + '</div>' +
        '<h2>' + post.title + '</h2>' +
        '<p>' + post.excerpt + '</p>' +
      '</a>';
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  var BODY_BLOCK_TAGS = { normal: 'p', h2: 'h2', h3: 'h3', h4: 'h3', blockquote: 'blockquote' };

  function renderSpans(children, markDefs) {
    markDefs = markDefs || [];
    return (children || []).map(function (span) {
      var html = escapeHtml(span.text || '');
      (span.marks || []).forEach(function (mark) {
        if (mark === 'strong') { html = '<strong>' + html + '</strong>'; return; }
        if (mark === 'em') { html = '<em>' + html + '</em>'; return; }
        var def = markDefs.filter(function (d) { return d._key === mark; })[0];
        if (def && def._type === 'link' && def.href) {
          html = '<a href="' + escapeHtml(def.href) + '" target="_blank" rel="noopener noreferrer">' + html + '</a>';
        }
      });
      return html;
    }).join('');
  }

  function renderInlineImage(block) {
    if (!block.asset) return '';
    var caption = block.caption ? '<div class="photo-caption">' + escapeHtml(block.caption) + '</div>' : '';
    return '' +
      '<div class="article-inline-image">' +
        '<img src="' + block.asset + '" alt="' + escapeHtml(block.alt || '') + '" loading="lazy">' +
        caption +
      '</div>';
  }

  /* post.body is Sanity Portable Text: an array of typed block/image
     objects (headings, marks, inline images all come through here). The
     built-in fallback catalog in data.js predates that and still uses
     plain paragraph strings, so both shapes are handled — see CLAUDE.md. */
  function renderBody(body) {
    if (!Array.isArray(body) || !body.length) return '';
    if (typeof body[0] === 'string') {
      return body.map(function (p) { return '<p>' + escapeHtml(p) + '</p>'; }).join('');
    }

    var html = '';
    var listBuffer = [];
    var listType = null;

    function flushList() {
      if (!listBuffer.length) return;
      var tag = listType === 'number' ? 'ol' : 'ul';
      html += '<' + tag + '>' + listBuffer.map(function (li) { return '<li>' + li + '</li>'; }).join('') + '</' + tag + '>';
      listBuffer = [];
      listType = null;
    }

    body.forEach(function (block) {
      if (block._type === 'image') {
        flushList();
        html += renderInlineImage(block);
        return;
      }
      if (block._type !== 'block') return;

      if (block.listItem) {
        if (listType && listType !== block.listItem) flushList();
        listType = block.listItem;
        listBuffer.push(renderSpans(block.children, block.markDefs));
        return;
      }
      flushList();
      var tag = BODY_BLOCK_TAGS[block.style] || 'p';
      html += '<' + tag + '>' + renderSpans(block.children, block.markDefs) + '</' + tag + '>';
    });
    flushList();

    return html;
  }

  global.grhamIsLightSwatch = isLightSwatch;
  global.grhamMediaStyle = mediaStyle;
  global.grhamSwatchDotsHTML = swatchDotsHTML;
  global.grhamTileCardHTML = tileCardHTML;
  global.grhamPortfolioCardHTML = portfolioCardHTML;
  global.grhamBlogCardHTML = blogCardHTML;
  global.grhamGetQueryParam = getQueryParam;
  global.grhamRenderBody = renderBody;
})(window);
