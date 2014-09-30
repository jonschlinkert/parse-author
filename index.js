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
    name: RegExp.$1,
    email: RegExp.$2,
    url: RegExp.$3
  };
};
