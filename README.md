# Twitter PIN Auth [![Build Status](https://secure.travis-ci.org/chrisenytc/twitter-pin-auth.png?branch=master)](http://travis-ci.org/chrisenytc/twitter-pin-auth) [![NPM version](https://badge-me.herokuapp.com/api/npm/twitter-pin-auth.png)](http://badges.enytc.com/for/npm/twitter-pin-auth)

> A api wrapper to authenticate with twitter using the PIN-based authorization method

## Getting Started
Install the module with: `npm install twitter-pin-auth`

```javascript
var TwitterPinAuth = require('twitter-pin-auth');
var twitterPinAuth = new TwitterPinAuth('consumerKey', 'consumerSecret');
```

## Documentation

#### .requestAuthUrl()

The 'requestAuthUrl' method is responsible for request a authorization url.

How to use this method with promise

```javascript
twitterPinAuth.requestAuthUrl()
    .then(function(url) {
        console.log(url); // "https://twitter.com/oauth/authorize?oauth_token=R7UC5SKKmHfbA7OH4HOpn6WZSrLMZG8G"
    }).catch(function(err) {
        console.error(err);
    });
```

How to use this method with callback

```javascript
twitterPinAuth.requestAuthUrl(function(err, url) {
    if(err) {
        return console.error(err);
    }
    console.log(url); // "https://twitter.com/oauth/authorize?oauth_token=R7UC5SKKmHfbA7OH4HOpn6WZSrLMZG8G"
});
```

#### .authorize(pin)

**Parameter**: `pin`
**Type**: `Number`
**Example**: `3321883`

The 'authorize' method is responsible for generate a accessTokenKey and accessTokenSecret.

How to use this method with promise

```javascript
twitterPinAuth.authorize(3321883)
    .then(function(data) {
        console.log(data.accessTokenKey); // "892902319-b9Mqq07LAvXWBMYYQy6jDv3trzm7V9A8ae2RGPpG"
        console.log(data.accessTokenSecret); // "8f59gOM57GeRMkT4gWVI88ljylw2c7Ttc8YMWOf1dYOEI"
    }).catch(function(err) {
        console.error(err);
    });
```

How to use this method with callback

```javascript
twitterPinAuth.authorize(3321883, function(err, data) {
    if(err) {
        return console.error(err);
    }
    console.log(data.accessTokenKey); // "892902319-b9Mqq07LAvXWBMYYQy6jDv3trzm7V9A8ae2RGPpG"
    console.log(data.accessTokenSecret); // "8f59gOM57GeRMkT4gWVI88ljylw2c7Ttc8YMWOf1dYOEI"
});
```

## Contributing

Please submit all issues and pull requests to the [chrisenytc/twitter-pin-auth](https://github.com/chrisenytc/twitter-pin-auth) repository!

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/chrisenytc/twitter-pin-auth/issues).

## License 

The MIT License

Copyright (c) 2015, Christopher EnyTC

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
