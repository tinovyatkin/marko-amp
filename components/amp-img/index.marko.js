// Compiled using marko@4.4.28 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/dist/html").t(__filename),
    module_ampImgRenderer = require("./amp-img"),
    ampImgRenderer = module_ampImgRenderer.default || module_ampImgRenderer,
    marko_helpers = require("marko/dist/runtime/html/helpers"),
    marko_str = marko_helpers.s,
    marko_loadTag = marko_helpers.t,
    include_tag = marko_loadTag(require("marko/dist/taglibs/core/include-tag")),
    marko_attr = marko_helpers.a,
    marko_classAttr = marko_helpers.ca;

function render(input, out) {
  var data = input;

  const { src, srcset, sizes, alt = "", height, width, layout, heights, media, class: classList } = input;

  const type = /\.webp$/i.test(src) ? "image/webp" : undefined;

  if (out.global.amp) {
    out.w(marko_str(ampImgRenderer(input, !(!input.renderBody))));

    if (input.renderBody) {
      include_tag({
          _target: input
        }, out);

      out.w("</amp-img>");
    }
  } else {
    if (input.renderBody) {
      out.w("<picture" +
        marko_classAttr(classList) +
        "><source" +
        marko_attr("type", type) +
        marko_attr("srcset", srcset || src) +
        marko_attr("sizes", sizes) +
        marko_attr("media", media) +
        ">");

      include_tag({
          _target: input
        }, out);

      out.w("</picture>");
    } else {
      out.w("<img" +
        marko_attr("src", src) +
        marko_attr("srcset", srcset) +
        marko_attr("sizes", sizes) +
        marko_attr("alt", alt) +
        marko_attr("height", height) +
        marko_attr("width", width) +
        marko_classAttr(classList) +
        ">");
    }
  }
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "marko/dist/taglibs/core/include-tag"
    ]
  };
