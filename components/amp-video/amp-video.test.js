'use strict';

/* eslint-env browser */
const AmpVideo = require('marko').load(require.resolve('./index.marko'));
const nestedAmpVideo = require('marko').load(
  require.resolve('../../__tests__/templates/amp-video-nested.marko'),
);

describe('amp-video', () => {
  it('render <amp-video> when out.global.amp is true', () => {
    document.body.innerHTML = AmpVideo.renderToString({
      $global: {
        amp: true,
      },
      autoplay: true,
      src: 'https://localhost',
    });

    const els = document.getElementsByTagName('amp-video');
    expect(els).toHaveLength(1);
    const ampVideoEl = els[0];
    expect(ampVideoEl.getAttribute('src')).toBe('https://localhost');
    expect(ampVideoEl.hasAttribute('autoplay')).toBeTruthy();
    expect(ampVideoEl.childElementCount).toBe(0);
  });

  it('render <video> when out.global.amp is not true', () => {
    document.body.innerHTML = AmpVideo.renderToString({
      controls: true,
      playsinline: true,
      src: 'https://localhost',
    });

    const els = document.getElementsByTagName('video');
    expect(els).toHaveLength(1);
    const videoEl = els[0];
    expect(videoEl.getAttribute('src')).toBe('https://localhost');
    expect(videoEl.hasAttribute('controls')).toBeTruthy();
    expect(videoEl.hasAttribute('playsinline')).toBeTruthy();
    expect(videoEl.childElementCount).toBe(0);
  });

  it('adds script element to head when rendering with <amp-boilerplate>', async () => {
    // Can't use sync rendering here, due to asyncFragment
    document.documentElement.innerHTML = (await nestedAmpVideo.render({
      $global: {
        amp: true,
      },
    })).toString();

    const additionalScript = document.head.querySelector(
      'script[custom-element="amp-video"]',
    );
    expect(additionalScript).toBeDefined();
    expect(additionalScript.src).toMatch(
      'https://cdn.ampproject.org/v0/amp-video',
    );

    // check that it rendered body elements too
    const ampVideo = document.getElementsByTagName('amp-video')[0];
    expect(ampVideo).toBeDefined();
    expect(ampVideo.childElementCount).toBe(3);
    expect(ampVideo.getAttribute('layout')).toBe('responsive');
    expect(ampVideo.hasAttribute('playsinline')).toBeFalsy();
    expect(document.body).toMatchSnapshot();
  });

  it('VIDEO only attributes must remain', () => {
    // Can't use sync rendering here, due to asyncFragment
    document.documentElement.innerHTML = nestedAmpVideo.renderToString();

    // check that it rendered body elements too
    const video = document.getElementsByTagName('video')[0];
    expect(video).toBeDefined();
    expect(video.childElementCount).toBe(3);
    expect(video.hasAttribute('layout')).toBeFalsy();
    expect(video.hasAttribute('playsinline')).toBeTruthy();
    expect(document.body).toMatchSnapshot();
  });
});
