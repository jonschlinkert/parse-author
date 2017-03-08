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

describe('parse-author', function() {
  describe('empty', function() {
    it('should return an empty object when no matches are found', function() {
      assert.deepEqual(author(''), {});
    });

    it('should not fail on empty url placeholders', function() {
      assert.deepEqual(author(' ()'), {});
      assert.deepEqual(author('Jon Schlinkert ()'), {name: 'Jon Schlinkert'});
      assert.deepEqual(author('Jon Schlinkert <jon.schlinkert@sellside.com> ()'), {
        name: 'Jon Schlinkert',
        email: 'jon.schlinkert@sellside.com'
      });

      assert.deepEqual(author('<jon.schlinkert@sellside.com> ()'), {
        email: 'jon.schlinkert@sellside.com'
      });
    });

    it('should not fail on empty email placeholders', function() {
      assert.deepEqual(author('<>'), {});
      assert.deepEqual(author('Jon Schlinkert <>'), {name: 'Jon Schlinkert'});
      assert.deepEqual(author('<> (https://github.com/jonschlinkert)'), {
        url: 'https://github.com/jonschlinkert'
      });
    });

    it('should not fail on empty email and url placeholders', function() {
      assert.deepEqual(author('<> ()'), {});
    });
  });

  describe('name', function() {
    it('should parse name only', function() {
      assert.deepEqual(author('Jon Schlinkert'), {name: 'Jon Schlinkert'});
    });

    it('should work with leading or trailing whitespace', function() {
      assert.deepEqual(author(' Jon Schlinkert'), {name: 'Jon Schlinkert'});
      assert.deepEqual(author('Jon Schlinkert '), {name: 'Jon Schlinkert'});
      assert.deepEqual(author(' Jon Schlinkert '), {name: 'Jon Schlinkert'});
    });
  });

  describe('email', function() {
    it('should parse email only', function() {
      var fixture = '<jon.schlinkert@sellside.com>';
      assert.deepEqual(author(fixture), {email: 'jon.schlinkert@sellside.com'});
    });

    it('should parse email with leading or trailing whitespace', function() {
      assert.deepEqual(author(' <jon.schlinkert@sellside.com>'), {email: 'jon.schlinkert@sellside.com'});
      assert.deepEqual(author('<jon.schlinkert@sellside.com> '), {email: 'jon.schlinkert@sellside.com'});
      assert.deepEqual(author(' <jon.schlinkert@sellside.com> '), {email: 'jon.schlinkert@sellside.com'});
    });
  });

  describe('url', function() {
    it('should parse url only', function() {
      var fixture = '(https://github.com/jonschlinkert)';
      assert.deepEqual(author(fixture), {url: 'https://github.com/jonschlinkert'});
    });

    it('should parse url with leading or trailing whitespace', function() {
      assert.deepEqual(author(' (https://github.com/jonschlinkert)'), {url: 'https://github.com/jonschlinkert'});
      assert.deepEqual(author('(https://github.com/jonschlinkert) '), {url: 'https://github.com/jonschlinkert'});
      assert.deepEqual(author(' (https://github.com/jonschlinkert) '), {url: 'https://github.com/jonschlinkert'});
    });
  });

  describe('name and url', function() {
    it('should parse name and url only', function() {
      var fixture = 'Jon Schlinkert (https://github.com/jonschlinkert)';
      assert.deepEqual(author(fixture), {
        name: 'Jon Schlinkert',
        url: 'https://github.com/jonschlinkert'
      });
    });
  });

  describe('name and email', function() {
    it('should parse name and email only', function () {
      var fixture = 'Jon Schlinkert <jon.schlinkert@sellside.com>';
      var actual = author(fixture);
      assert.deepEqual(author(fixture), {
        name: 'Jon Schlinkert',
        email: 'jon.schlinkert@sellside.com'
      });
    });

    it('should parse name and email with leading whitespace', function () {
      var fixture = ' Jon Schlinkert <jon.schlinkert@sellside.com>';
      var actual = author(fixture);
      assert.deepEqual(author(fixture), {
        name: 'Jon Schlinkert',
        email: 'jon.schlinkert@sellside.com'
      });
    });

    it('should parse name and email with trailing whitespace', function () {
      var fixture = 'Jon Schlinkert <jon.schlinkert@sellside.com> ';
      var actual = author(fixture);
      assert.deepEqual(author(fixture), {
        name: 'Jon Schlinkert',
        email: 'jon.schlinkert@sellside.com'
      });
    });

    it('should parse name and email with leading and trailing whitespace', function () {
      var fixture = ' Jon Schlinkert <jon.schlinkert@sellside.com> ';
      var actual = author(fixture);
      assert.deepEqual(author(fixture), {
        name: 'Jon Schlinkert',
        email: 'jon.schlinkert@sellside.com'
      });
    });
  });

  describe('name, email and url', function() {
    it('should parse name, email and url', function() {
      var fixture = 'Jon Schlinkert <jon.schlinkert@sellside.com> (https://github.com/jonschlinkert)';
      assert.deepEqual(author(fixture), {
        name: 'Jon Schlinkert',
        email: 'jon.schlinkert@sellside.com',
        url: 'https://github.com/jonschlinkert'
      });
    });

    it('should parse name, email and url when email has no leading whitespace', function() {
      var fixture = 'Jon Schlinkert<jon.schlinkert@sellside.com> (https://github.com/jonschlinkert)';
      assert.deepEqual(author(fixture), {
        name: 'Jon Schlinkert',
        email: 'jon.schlinkert@sellside.com',
        url: 'https://github.com/jonschlinkert'
      });
    });

    it('should parse name, email and url when url has no leading whitespace', function() {
      var fixture = 'Jon Schlinkert <jon.schlinkert@sellside.com>(https://github.com/jonschlinkert)';
      assert.deepEqual(author(fixture), {
        name: 'Jon Schlinkert',
        email: 'jon.schlinkert@sellside.com',
        url: 'https://github.com/jonschlinkert'
      });
    });

    it('should parse name, email and url with no separating whitespace', function() {
      var fixture = 'Jon Schlinkert<jon.schlinkert@sellside.com>(https://github.com/jonschlinkert)';
      assert.deepEqual(author(fixture), {
        name: 'Jon Schlinkert',
        email: 'jon.schlinkert@sellside.com',
        url: 'https://github.com/jonschlinkert'
      });
    });
  });

  describe('email and url only', function() {
    it('should parse email and url only', function() {
      var fixture = '<jon.schlinkert@sellside.com> (https://github.com/jonschlinkert)';
      assert.deepEqual(author(fixture), {
        email: 'jon.schlinkert@sellside.com',
        url: 'https://github.com/jonschlinkert'
      });
    });

    it('should parse email and url with leading whitespace', function() {
      var fixture = ' <jon.schlinkert@sellside.com> (https://github.com/jonschlinkert)';
      assert.deepEqual(author(fixture), {
        email: 'jon.schlinkert@sellside.com',
        url: 'https://github.com/jonschlinkert'
      });
    });

    it('should parse email and url with trailing whitespace', function() {
      var fixture = '<jon.schlinkert@sellside.com> (https://github.com/jonschlinkert) ';
      assert.deepEqual(author(fixture), {
        email: 'jon.schlinkert@sellside.com',
        url: 'https://github.com/jonschlinkert'
      });
    });

    it('should parse email and url with leading and trailing whitespace', function() {
      var fixture = ' <jon.schlinkert@sellside.com> (https://github.com/jonschlinkert) ';
      assert.deepEqual(author(fixture), {
        email: 'jon.schlinkert@sellside.com',
        url: 'https://github.com/jonschlinkert'
      });
    });

    it('should parse email and url with no separating whitespace', function() {
      var fixture = '<jon.schlinkert@sellside.com>(https://github.com/jonschlinkert)';
      assert.deepEqual(author(fixture), {
        email: 'jon.schlinkert@sellside.com',
        url: 'https://github.com/jonschlinkert'
      });
    });
  });

  describe('misordered properties', function() {
    it('should support misordered url and email properties', function() {
      var fixture = 'Jon Schlinkert (https://github.com/jonschlinkert) <jon.schlinkert@sellside.com>';
      assert.deepEqual(author(fixture), {
        name: 'Jon Schlinkert',
        email: 'jon.schlinkert@sellside.com',
        url: 'https://github.com/jonschlinkert'
      });
    });

    it('should support misordered url and email properties only', function() {
      var fixture = '(https://github.com/jonschlinkert) <jon.schlinkert@sellside.com>';
      assert.deepEqual(author(fixture), {
        email: 'jon.schlinkert@sellside.com',
        url: 'https://github.com/jonschlinkert'
      });
    });
  });
});
