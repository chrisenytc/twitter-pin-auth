/*
 * twitter-pin-auth
 * https://github.com/chrisenytc/twitter-pin-auth
 *
 * Copyright (c) 2015, Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module Dependencies
 */

var P = require('bluebird'),
    OAuth = require('oauth').OAuth;

/**
 * @class TwitterPinAuth
 *
 * @constructor
 *
 * Constructor responsible for provide PIN-based authorization
 *
 * @example
 *
 *     var api = new TwitterPinAuth('consumerKey', 'consumerSecret');
 *
 * @param {String} consumerKey The twitter consumer key
 * @param {String} consumerSecret The twitter consumer secret
 */

var TwitterPinAuth = module.exports = function TwitterPinAuth(consumerKey, consumerSecret) {
    if (!consumerKey || !consumerSecret || consumerKey === '' || consumerSecret === '') {
        throw new Error('consumerKey and consumerSecret is required!');
    }
    // Api data
    this.REQUEST_TOKEN_URL = 'https://api.twitter.com/oauth/request_token';
    this.ACCESS_TOKEN_URL = 'https://api.twitter.com/oauth/access_token';
    this.OAUTH_VERSION = '1.0';
    this.HASH_VERSION = 'HMAC-SHA1';
    // App Credentials
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this._data = {};
    //Instance
    this.oa = new OAuth(this.REQUEST_TOKEN_URL, this.ACCESS_TOKEN_URL, consumerKey, consumerSecret, this.OAUTH_VERSION, null, this.HASH_VERSION);
};

/*
 * Public Methods
 */

/**
 * Method responsible for request a authorization url
 *
 * @example
 *
 *     api.requestAuthUrl(function(err, url) {
 *          console.log(url);
 *     });
 *
 * @method requestAuthUrl
 * @public
 * @param {Function} callback A callback with authorization url
 */

TwitterPinAuth.prototype.requestAuthUrl = function(cb) {
    var that = this;
    return new P(function(resolve, reject) {
        that.oa.getOAuthRequestToken(function(err, oauthToken, oauthTokenSecret) {
            if (err) {
                reject(err);
            } else {
                //Save current credentials
                that._data.oauthToken = oauthToken;
                that._data.oauthTokenSecret = oauthTokenSecret;
                //Resolve
                resolve('https://twitter.com/oauth/authorize?oauth_token=' + oauthToken);
            }
        });
    }).nodeify(cb);
};

/**
 * Method responsible for generate a accessTokenKey and accessTokenSecret
 *
 * @example
 *
 *     api.authorize(3321883, function(err, data) {
 *          console.log(data.accessTokenKey, data.accessTokenSecret);
 *     });
 *
 * @method authorize
 * @public
 * @param {Number} pin A pin number
 * @param {Function} callback A callback with accessTokenKey and accessTokenSecret
 */

TwitterPinAuth.prototype.authorize = function(pin, cb) {
    var that = this;
    return new P(function(resolve, reject) {
        that.oa.getOAuthAccessToken(that._data.oauthToken, that._data.oauthTokenSecret, pin,
            function(err, oauthAccessToken, oauthAccessTokenSecret) {
                if (err) {
                    if (parseInt(err.statusCode) === 401) {
                        reject(new Error('The PIN number you have entered is incorrect!'));
                    } else {
                        reject(err);
                    }
                } else {
                    resolve({
                        accessTokenKey: oauthAccessToken,
                        accessTokenSecret: oauthAccessTokenSecret
                    });
                }
            });
    }).nodeify(cb);
};
