// Compiled using marko@4.4.28 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/dist/html").t(__filename),
    marko_loadTemplate = require("marko/dist/runtime/helper-loadTemplate"),
    amp_img_template = marko_loadTemplate(require.resolve("../../components/amp-img/index.marko")),
    marko_helpers = require("marko/dist/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    amp_img_tag = marko_loadTag(amp_img_template);

function render(input, out) {
  var data = input;

  amp_img_tag({
      alt: "Mountains",
      width: "550",
      height: "368",
      src: "images/mountains.webp",
      renderBody: function renderBody(out) {
        amp_img_tag({
            alt: "Mountains",
            fallback: true,
            width: "550",
            height: "368",
            src: "images/mountains.jpg"
          }, out);
      }
    }, out);
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "../../components/amp-img/index.marko"
    ]
  };
