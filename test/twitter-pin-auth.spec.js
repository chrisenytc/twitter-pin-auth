/*
 * twitter-pin-auth
 * https://github.com/chrisenytc/twitter-pin-auth
 *
 * Copyright (c) 2015, Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai'),
    expect = chai.expect;

chai.should();

var TwitterPinAuth = require('../lib/twitter-pin-auth.js'),
    twitterPinAuth = new TwitterPinAuth('uXChHM6h2Mn9NObUQHHAm758d', '0nu5pesEslBITfVSGkBpRlnBPuoVt1pcPj2M6bSML8N9PAazCz');

describe('twitterPinAuth module', function() {
    describe('#requestAuthUrl()', function() {
        it('should return a authorization url using promise', function(done) {
            twitterPinAuth.requestAuthUrl()
                .then(function(url) {
                    expect(url).to.exist; // jshint ignore:line
                    expect(url).to.not.empty; // jshint ignore:line
                    expect(url).to.be.a('string');
                    done();
                }).catch(function(err) {
                    done(err);
                });
        });
        it('should return a authorization url using callback', function(done) {
            twitterPinAuth.requestAuthUrl(function(err, url) {
                if (err) {
                    return done(err);
                }
                expect(err).to.not.exist; // jshint ignore:line
                expect(url).to.exist; // jshint ignore:line
                expect(url).to.not.empty; // jshint ignore:line
                expect(url).to.be.a('string');
                done();
            });
        });
    });
    describe('#authorize()', function() {
        it('should return a invalid PIN error using promise', function(done) {
            twitterPinAuth.authorize(8321883)
                .then(function(data) {
                    expect(data).to.not.exist; // jshint ignore:line
                    done();
                }).catch(function(err) {
                    expect(err).to.exist; // jshint ignore:line
                    expect(err).to.be.an.instanceof(Error);
                    expect(err.message).to.equal('The PIN number you have entered is incorrect!'); // jshint ignore:line
                    done();
                });
        });
        it('should return a invalid PIN error using callback', function(done) {
            twitterPinAuth.authorize(8321883, function(err, data) {
                expect(err).to.exist; // jshint ignore:line
                expect(err).to.be.an.instanceof(Error);
                expect(err.message).to.equal('The PIN number you have entered is incorrect!'); 
                expect(data).to.not.exist; // jshint ignore:line
                done();
            });
        });
    });
});
