'use strict';

/* eslint-env browser */
const AmpBoilerplate = require('marko').load(require.resolve('./index.marko'));
const AmpBoilerplateScripts = require('marko').load(
  require.resolve('../../__tests__/templates/amp-boilerplate-scripts.marko'),
);

describe('amp-boilerplate', () => {
  it('basic AMP rendering', async () => {
    // Can't use sync rendering here, due to asyncFragment
    document.head.innerHTML = (await AmpBoilerplate.render({
      $global: {
        amp: true,
      },
    })).toString();

    expect(document.querySelectorAll('style[amp-boilerplate]')).toHaveLength(1);
    expect(document.querySelectorAll('noscript')).toHaveLength(1);
    expect(document.querySelector('script[async]').src).toBe(
      'https://cdn.ampproject.org/v0.js',
    );
  });

  it('empty HTML rendering', () => {
    expect(AmpBoilerplate.renderToString()).toHaveLength(0);
  });

  it('additional AMP scripts collecting', async () => {
    // Can't use sync rendering here, due to asyncFragment
    document.documentElement.innerHTML = (await AmpBoilerplateScripts.render({
      $global: {
        amp: true,
      },
    })).toString();

    expect(
      document.head.querySelectorAll('style[amp-boilerplate]'),
    ).toHaveLength(1);
    expect(document.querySelectorAll('noscript')).toHaveLength(1);
    const scripts = document.head.querySelectorAll('script[async]');
    expect(scripts[0].src).toBe('https://cdn.ampproject.org/v0.js');
    const additionalScript = scripts[1];
    expect(additionalScript).toBeDefined();
    expect(additionalScript.getAttribute('custom-element')).toBe('amp-test');
    expect(additionalScript.src).toBe('https://test.url/');
  });
});
