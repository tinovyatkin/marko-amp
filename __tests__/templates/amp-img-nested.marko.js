// Compiled using marko@4.14.2 - DO NOT EDIT
'use strict';

const marko_template = (module.exports = require('marko/dist/html').t(
    __filename,
  )),
  marko_componentType =
    '/marko-amp$1.0.1/__tests__/templates/amp-img-nested.marko',
  components_helpers = require('marko/dist/components/helpers'),
  marko_renderer = components_helpers.r,
  marko_defineComponent = components_helpers.c,
  marko_loadTemplate = require('marko/dist/runtime/helper-loadTemplate'),
  amp_img_template = marko_loadTemplate(
    require.resolve('../../components/amp-img/index.marko'),
  ),
  marko_helpers = require('marko/dist/runtime/html/helpers'),
  marko_loadTag = marko_helpers.t,
  amp_img_tag = marko_loadTag(amp_img_template);

function render(input, out, __component, component, state) {
  const data = input;

  amp_img_tag(
    {
      alt: 'Mountains',
      width: '550',
      height: '368',
      src: 'images/mountains.webp',
      renderBody: function renderBody(out) {
        amp_img_tag(
          {
            alt: 'Mountains',
            fallback: true,
            width: '550',
            height: '368',
            src: 'images/mountains.jpg',
          },
          out,
          __component,
          '1',
        );
      },
    },
    out,
    __component,
    '0',
  );
}

marko_template._ = marko_renderer(render, {
  al_: true,
  _m_: marko_componentType,
});

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
  id: '/marko-amp$1.0.1/__tests__/templates/amp-img-nested.marko',
  tags: ['../../components/amp-img/index.marko'],
};
