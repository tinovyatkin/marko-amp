'use strict';

/* eslint-env browser */
const AmpImg = require('marko').load(require.resolve('./index.marko'));
const nestedAmpImg = require('marko').load(
  require.resolve('../../__tests__/templates/amp-img-nested.marko'),
);

describe('amp-img', () => {
  test('render <amp-img> when out.global.amp is true', () => {
    document.body.innerHTML = AmpImg.renderToString({
      $global: {
        amp: true,
      },
      alt: 'Test alt',
      height: 200,
      src: 'https://localhost',
      width: 170,
    });

    const els = document.getElementsByTagName('amp-img');
    expect(els).toHaveLength(1);
    const ampImgEl = els[0];
    expect(ampImgEl.getAttribute('src')).toBe('https://localhost');
    expect(ampImgEl.getAttribute('width')).toBe('170');
    expect(ampImgEl.getAttribute('height')).toBe('200');
    expect(ampImgEl.getAttribute('alt')).toBe('Test alt');
  });

  test('render <img> when out.global.amp is not true', () => {
    document.body.innerHTML = AmpImg.renderToString({
      alt: 'Test alt',
      height: 200,
      src: 'https://localhost',
      width: 170,
    });

    const els = document.getElementsByTagName('img');
    expect(els).toHaveLength(1);
    const imgEl = els[0];
    expect(imgEl.getAttribute('src')).toBe('https://localhost');
    expect(imgEl.getAttribute('width')).toBe('170');
    expect(imgEl.getAttribute('height')).toBe('200');
    expect(imgEl.getAttribute('alt')).toBe('Test alt');
  });

  test('Nested template HTML render', () => {
    // render normal version
    document.body.innerHTML = nestedAmpImg.renderToString();
    console.log(document.body.innerHTML);
    const tags = document.getElementsByTagName('picture');
    expect(tags).toHaveLength(1);
    const picture = tags[0];
    expect(picture.childElementCount).toBe(2);
    const source = picture.firstElementChild;
    expect(source.type).toBe('image/webp');
    expect(source.srcset).toBe('images/mountains.webp');
    const img = picture.lastElementChild;
    expect(img.src).toBe('images/mountains.jpg');
    expect(img.width).toBe(550);
    expect(img.hasAttribute('height')).toBeFalsy();
    expect(img.alt).toBe('Mountains');
  });

  test('Nested template AMP render', () => {
    // render AMP version
    document.body.innerHTML = nestedAmpImg.renderToString({
      $global: {
        amp: true,
      },
    });
    const tags = document.getElementsByTagName('amp-img');
    expect(tags).toHaveLength(2);
    expect(tags[0].childElementCount).toBe(1);
    expect(tags[1].childElementCount).toBe(0);
  });
});
