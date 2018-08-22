'use strict';

const path = require('path');

const tagData = require(path.resolve(__dirname, '../../marko.json')).tags[
  'amp-video'
];

function renderAmpVideo(input = {}, dontClose) {
  const attributes = [];

  // getting attributes names
  for (const attr in tagData.attributes) {
    if (attr in input && !/^playsinline$/i.test(attr)) {
      if (typeof input[attr] === 'boolean' || input[attr].length === 0)
        attributes.push(attr);
      else if (input[attr]) attributes.push(`${attr}="${input[attr]}"`);
    }
  }
  const res = [`<amp-video ${attributes.join(' ')}>`];
  if (!dontClose) res.push('</amp-video>');
  return res.join('');
}
module.exports = renderAmpVideo;
