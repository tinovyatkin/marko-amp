'use strict';

/* eslint-env browser */
const AmpImg = require('marko').load(require.resolve('./index.marko'));
const nestedAmpImg = require('marko').load(
  require.resolve('../../__tests__/templates/amp-img-nested.marko'),
);

describe('amp-img', () => {
  test('render <amp-img> when out.global.amp is true', async () => {
    const render = AmpImg.renderToString({
      $global: {
        amp: true,
      },
      alt: 'Test alt',
      height: 200,
      src: 'https://localhost',
      width: 170,
    });
    expect(render).toMatchInlineSnapshot(
      `"<amp-img src=\\"https://localhost\\" alt=\\"Test alt\\" height=\\"200\\" width=\\"170\\"></amp-img>"`,
    );
  });

  test('render <img> when out.global.amp is not true', () => {
    const render = AmpImg.renderToString({
      alt: 'Test alt',
      height: 200,
      src: 'https://localhost',
      width: 170,
    });
    expect(render).toMatchInlineSnapshot(
      `"<img src=\\"https://localhost\\" alt=\\"Test alt\\" height=200 width=170>"`,
    );
  });

  test('Nested template HTML render', () => {
    // render normal version
    expect(nestedAmpImg.renderToString()).toMatchSnapshot();
  });

  test('Nested template AMP render', () => {
    // render AMP version
    expect(
      nestedAmpImg.renderToString({
        $global: {
          amp: true,
        },
      }),
    ).toMatchSnapshot();
  });
});
