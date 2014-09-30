/*!
 * parse-author <https://github.com/assemble/parse-author>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var should = require('should');
var author = require('./');

describe('author:', function () {
  it('should return empty fields for missing properties.', function () {
    author('').should.eql({name: '', email: '', url: ''});
  });

  it('should return a parsed author object.', function () {
    var fixture = 'Jon Schlinkert <jon@foo.email> (https://github.com/jonschlinkert)';
    author(fixture).should.eql({name: 'Jon Schlinkert', email: 'jon@foo.email', url: 'https://github.com/jonschlinkert'});
  });

  it('should return an array of author objects.', function () {
    var fixture = 'Jon Schlinkert <jon@foo.email> (https://github.com/jonschlinkert)';
    author(fixture).should.eql({name: 'Jon Schlinkert', email: 'jon@foo.email', url: 'https://github.com/jonschlinkert'});
  });

  it('should return name and email only .', function () {
    var fixture = 'Jon Schlinkert (https://github.com/jonschlinkert)';
    author(fixture).should.eql({name: 'Jon Schlinkert', email: '', url: 'https://github.com/jonschlinkert'});
  });

  it('should return mixed properties.', function () {
    var fixture = 'Jon Schlinkert ';
    author(fixture).should.eql({name: 'Jon Schlinkert', email: '', url: ''});
  });

  it('should return mixed properties.', function () {
    var fixture = '<jon@foo.email> (https://github.com/jonschlinkert)';
    author(fixture).should.eql({name: '', email: 'jon@foo.email', url: 'https://github.com/jonschlinkert'});
  });

  it('should return mixed properties.', function () {
    var fixture = '<jon@foo.email> ';
    author(fixture).should.eql({name: '', email: 'jon@foo.email', url: ''});
  });

  it('should return name only.', function () {
    author('Jon Schlinkert').should.eql({name: 'Jon Schlinkert', email: '', url: ''});
  });

  it('should return email only.', function () {
    var fixture = '<jon@foo.email>';
    author(fixture).should.eql({name: '', email: 'jon@foo.email', url: ''});
  });

  it('should return url only.', function () {
    var fixture = '(https://github.com/jonschlinkert)';
    author(fixture).should.eql({name: '', email: '', url: 'https://github.com/jonschlinkert'});
  });
});