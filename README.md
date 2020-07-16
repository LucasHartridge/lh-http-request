# LH Http Request library

The interface to handle HTTP requests

## Installing
In order to install we just need to do. If you can not download make sure that you are logging in npm with LH Http credentials

```npm install lh-http-request```

## Initializing
After installing we need to initialize the library with the service configuration.

Example without creating a new instance:
```javascript
const requestService = require('lh-http-request');
```

Example creating a new instance:
```javascript
const baseUrl = "http://devboxurl.com";
const cookie = true;
const requestService = require('lh-http-request').create({ baseUrl, cookie });;
```

Optional example of creating with headers to be sent on each request:
```javascript
const baseUrl = "http://devboxurl.com";
const cookie = true;
const clientHeaders = {Authorization: 'Bearer asdas2123asdq34'}
const requestService = require('lh-http-request').create({ baseUrl, cookie, clientHeaders });;
```

### Params:
baseUrl: This will be used in all the request.
cookie: If you want to share cookies across the request that you will make 
clientHeaders: Headers that will be sent across with every request

## Methods
How to use url ? - Url is and Object that has 3 properties

```javascript
const url = {
  path: '/example/url'
};

const response = requestService.post({url});
```
* Using this case as example a post request will be made against baseUrl + path

Let's suppose that I have a dynamic url 

```javascript
const url = {
  path: '/clients/:clientId',
  replacements: {
    'clientId' : 1
  }
};

const response = requestService.post({url});
```

* Using this case as example a post request will be made to baseUrl + /clients/1

Let's suppose that I want to send query params

```javascript
const url = {
  path: '/clients',
  queryParam: {
    'clientId' : 1,
    'propertyId' : 2
  }
};

```
* Using this case as example a post request will be made to baseUrl + /clients?clientId=1&propertyId=2
### get({ url, headers })
Send a get request to the specified url, with the optional headers.

If no headers are specified, these are the default ones:
* Accept: 'application/json'
* Accept-Language: 'en_US'
* X-Request-Id: 'uuid'
* User-Agent: 'LH Http  Request Library'

### post({ url, payload, headers })
Send a post request to the specified url with the payload, and with the optional headers.

If no headers are specified, these are the default ones:
* Accept: 'application/json'
* Accept-Language: 'en_US'
* X-Request-Id: 'uuid'
* User-Agent: 'LH Http  Request Library'

### patch({ url, payload, headers })
Send a patch request to the specified url with the payload, and with the optional headers.

If no headers are specified, these are the default ones:
* Accept: 'application/json'
* Accept-Language: 'en_US'
* X-Request-Id: 'uuid'
* User-Agent: 'LH Http  Request Library'

### postFiles({ url, files, headers })
Send a multipart post request to the specified url with the files, and with the optional headers.

If no headers are specified, these are the default ones:
* Accept: 'application/json'
* Content-Type: 'multipart/form-data'
* Accept-Language: 'en_US'
* X-Request-Id: 'uuid'
* User-Agent: 'LH Http  Request Library'

Files should be an array of objects with the properties:
* name: name of the file being uploaded
* path: path to the files being uploaded

### delete({ url, headers })
Send a delete request to the specified url, and with the optional headers.

If no headers are specified, these are the default ones:
* Accept: 'application/json'
* Accept-Language: 'en_US'
* X-Request-Id: 'uuid'
* User-Agent: 'LH Http  Request Library'

### resetCookies()
It will create a new Cookie instance, cleaning them

### updateBaseUrl(baseUrl)
It will update the baseUrl