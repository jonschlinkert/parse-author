/*!
 * parse-author <https://github.com/jonschlinkert/parse-author>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var author = require('./');

describe('author:', function() {
  it('should return empty fields for missing properties', function() {
    assert.deepEqual(author(''), {name: '', email: '', url: ''});
  });

  it('should return a parsed author object', function() {
    var fixture = 'Jon Schlinkert <jon@foo.email> (https://github.com/jonschlinkert)';
    assert.deepEqual(author(fixture), {name: 'Jon Schlinkert', email: 'jon@foo.email', url: 'https://github.com/jonschlinkert'});
  });

  it('should return name and email only', function() {
    var fixture = 'Jon Schlinkert (https://github.com/jonschlinkert)';
    assert.deepEqual(author(fixture), {name: 'Jon Schlinkert', email: '', url: 'https://github.com/jonschlinkert'});
  });

  it('should return mixed properties', function() {
    var fixture = 'Jon Schlinkert ';
    assert.deepEqual(author(fixture), {name: 'Jon Schlinkert', email: '', url: ''});
  });

  it('should handle empty url placeholders', function() {
    assert.deepEqual(author(' ()'), {name: '', email: '', url: ''});
    assert.deepEqual(author('Jon Schlinkert ()'), {name: 'Jon Schlinkert', email: '', url: ''});
    assert.deepEqual(author('<jon.schlinkert@sellside.com> ()'), {name: '', email: 'jon.schlinkert@sellside.com', url: ''});
  });

  it('should handle empty email placeholders', function() {
    assert.deepEqual(author('<>'), {name: '', email: '', url: ''});
    assert.deepEqual(author('Jon Schlinkert <>'), {name: 'Jon Schlinkert', email: '', url: ''});
    assert.deepEqual(author('<> (https://github.com/jonschlinkert)'), {name: '', email: '', url: 'https://github.com/jonschlinkert'});
  });

  it('should handle empty email and url placeholders', function() {
    assert.deepEqual(author('<> ()'), {name: '', email: '', url: ''});
  });

  it('should return mixed properties', function() {
    var fixture = '<jon@foo.email> (https://github.com/jonschlinkert)';
    assert.deepEqual(author(fixture), {name: '', email: 'jon@foo.email', url: 'https://github.com/jonschlinkert'});
  });

  it('should return name only', function() {
    assert.deepEqual(author('Jon Schlinkert'), {name: 'Jon Schlinkert', email: '', url: ''});
  });

  it('should return email only', function() {
    var fixture = '<jon@foo.email>';
    assert.deepEqual(author(fixture), {name: '', email: 'jon@foo.email', url: ''});
  });

  it('should return url only', function() {
    var fixture = '(https://github.com/jonschlinkert)';
    assert.deepEqual(author(fixture), {name: '', email: '', url: 'https://github.com/jonschlinkert'});
  });
});
