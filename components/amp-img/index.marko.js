// Compiled using marko@4.4.28 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/dist/html").t(__filename),
    marko_helpers = require("marko/dist/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    include_tag = marko_loadTag(require("marko/dist/taglibs/core/include-tag")),
    marko_attrs = marko_helpers.as,
    marko_attr = marko_helpers.a,
    marko_classAttr = marko_helpers.ca;

const ampAttrs = {
  // <amp-img> attrs:
  'src': true,
  'srcset': true,
  'sizes': true,
  'alt': true,
  'attribution': true,
  'height': true,
  'width': true,

  // Common AMP attributes:
  'fallback': true,
  'heights': true,
  'layout': true,
  'media': true,
  'noloading': true,
  'on': true,
  'placeholder': true,
};
// We just need to list out the attributes that are common with
// the <amg-img> attributes since unrecognized attributes will
// passthrough to the <img> tag
const imgAttrs = {
  'src': true,
  'srcset': true,
  'alt': true,
  'height': true,
  'width': true
}

function getAmpAttrs(input) {
  return Object.keys(input).reduce((attrs, attrName) => {
    if (attrName in ampAttrs) {
      attrs[attrName] = input[attrName];
    }
    return attrs;
  }, {});
}

function getImgAttrs(input) {
  return Object.keys(input).reduce((attrs, attrName) => {
    if (attrName in imgAttrs || !(attrName in ampAttrs)) {
      attrs[attrName] = input[attrName];
    }
    return attrs;
  }, {});
};

function render(input, out) {
  var data = input;

  const { src, srcset } = input;

  const type = /\.webp$/i.test(src) ? "image/webp" : undefined;

  if (out.global.amp) {
    if (!src && !srcset)
      throw new Error(
        `Either src or srcset attribute is required for AMP-IMG tag`,
      );

    out.w("<AMP-IMG" +
      marko_attrs(getAmpAttrs(input)) +
      ">");

    if (input.renderBody) {
      include_tag({
          _target: input
        }, out);
    }

    out.w("</AMP-IMG>");
  } else {
    if (input.renderBody) {
      out.w("<picture" +
        marko_classAttr(input.class) +
        "><source" +
        marko_attr("type", type) +
        marko_attr("srcset", srcset || src) +
        marko_attr("sizes", input.sizes) +
        marko_attr("media", input.media) +
        ">");

      include_tag({
          _target: input
        }, out);

      out.w("</picture>");
    } else {
      out.w("<img" +
        marko_attrs(getImgAttrs(input)) +
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
