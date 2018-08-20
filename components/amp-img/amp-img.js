'use strict';

const path = require('path');

const tagData = require(path.resolve(__dirname, '../../marko.json')).tags[
  'amp-img'
];

function renderAmpImg(input = {}, dontClose) {
  const attributes = [];
  if (!input.src && !input.srcset)
    throw new Error(
      `Either src or srcset attribute is required for AMP-IMG tag`,
    );
  // if (src) attributes.push(`src="${src}"`);
  // getting attributes names
  for (const attr in tagData.attributes) {
    if (attr in input) {
      if (typeof input[attr] === 'boolean') attributes.push(attr);
      else attributes.push(`${attr}="${input[attr]}"`);
    }
  }
  // if (fallback) attributes.push('fallback');
  const res = [`<amp-img ${attributes.join(' ')}>`];
  if (!dontClose) res.push('</amp-img>');
  return res.join('');
}
module.exports = renderAmpImg;
