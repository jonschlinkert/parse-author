/*!
 * parse-author <https://github.com/jonschlinkert/parse-author>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var re = require('author-regex');

module.exports = function(str) {
  if (typeof str !== 'string') {
    throw new TypeError('expected author to be a string');
  }
  str = str.replace(/(\( *\)|< *>)?/g, '');
  var author = re().exec(str) || {};

  var obj = {};
  if (author[1] && author[1].trim()) obj.name = author[1].trim();
  if (author[2] && author[2].trim()) obj.email = author[2].trim();
  if (author[3] && author[3].trim()) obj.url = author[3].trim();
  return obj;
};
