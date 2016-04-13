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

  return {
    name: emit(author[1]),
    email: emit(author[2]),
    url: emit(author[3])
  };
};

function emit(str) {
  return (str == null ? '' : String(str)).trim();
}
