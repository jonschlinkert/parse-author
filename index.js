/*!
 * parse-author <https://github.com/jonschlinkert/parse-author>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var re = require('author-regex');

module.exports = function(str) {
  var author = re().exec(str);
  return {
    name: author[1] || '',
    email: author[2] || '',
    url: author[3] || ''
  };
};
