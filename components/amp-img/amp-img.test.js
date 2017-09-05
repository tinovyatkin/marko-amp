'use strict';

/* eslint-env browser */
const marko = require('marko');
const path = require('path');

const ampImgRenderer = require('./amp-img');

describe('amp-img', () => {
  test('amp-img render', () => {
    const tag = ampImgRenderer({
      src: 'https://localhost',
      width: 170,
      height: 200,
      alt: 'Test alt',
    });
    document.body.innerHTML = tag;
    const tags = document.getElementsByTagName('amp-img');
    expect(tags).toHaveLength(1);
    const ampImg = tags[0];
    expect(ampImg.getAttribute('src')).toBe('https://localhost');
    expect(ampImg.getAttribute('width')).toBe('170');
    expect(ampImg.getAttribute('height')).toBe('200');
    expect(ampImg.getAttribute('alt')).toBe('Test alt');
  });

  test('Render component', async () => {
    // loading template
    const template = marko.load(path.join(__dirname, 'index.marko'));
    // render normal version
    const html = (await template.render({
      src: 'https://image.url',
      height: 170,
      width: 170,
      alt: 'Long long alt text',
    })).toString();
    expect(typeof html).toBe('string');
    document.body.innerHTML = html;
    const tags = document.getElementsByTagName('img');
    expect(tags).toHaveLength(1);
    const img = tags[0];
    expect(img.getAttribute('src')).toBe('https://image.url');
    expect(img.getAttribute('width')).toBe('170');
    expect(img.getAttribute('height')).toBe('170');
    expect(img.getAttribute('alt')).toBe('Long long alt text');
    // render AMP version
    const htmlAmp = (await template.render({
      src: 'https://image.url',
      height: 170,
      width: 170,
      alt: 'Long long alt text',
      $global: {
        amp: true,
      },
    })).toString();
    expect(typeof htmlAmp).toBe('string');
    document.body.innerHTML = htmlAmp;
    const ampTags = document.getElementsByTagName('amp-img');
    expect(ampTags).toHaveLength(1);
    const ampImg = ampTags[0];
    expect(ampImg.getAttribute('src')).toBe('https://image.url');
    expect(ampImg.getAttribute('width')).toBe('170');
    expect(ampImg.getAttribute('height')).toBe('170');
    expect(ampImg.getAttribute('alt')).toBe('Long long alt text');
  });

  test('Nested template HTML render', async () => {
    // loading template
    const template = marko.load(
      path.join(__dirname, '../../__tests__/templates/amp-img-nested.marko'),
    );
    // render normal version
    const html = (await template.render()).toString();
    expect(typeof html).toBe('string');
    document.body.innerHTML = html;
    const tags = document.getElementsByTagName('picture');
    console.log(html);
    expect(tags).toHaveLength(1);
    const picture = tags[0];
    expect(picture.childElementCount).toBe(2);
    const source = picture.firstElementChild;
    expect(source.type).toBe('image/webp');
    expect(source.srcset).toBe('images/mountains.webp');
    const img = picture.lastElementChild;
    expect(img.src).toBe('images/mountains.jpg');
    expect(img.width).toBe(550);
    expect(img.height).toBe(368);
    expect(img.alt).toBe('Mountains');
  });

  test('Nested template AMP render', async () => {
    // loading template
    const template = marko.load(
      path.join(__dirname, '../../__tests__/templates/amp-img-nested.marko'),
    );
    // render AMP version
    const html = (await template.render({
      $global: {
        amp: true,
      },
    })).toString();
    expect(typeof html).toBe('string');
    document.body.innerHTML = html;
    const tags = document.getElementsByTagName('amp-img');
    console.log(html);
    expect(tags).toHaveLength(2);
  });
});
