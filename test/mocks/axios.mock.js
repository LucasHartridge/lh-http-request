'use strict';

module.exports = {
  error: {
    code: "ENOTFOUND",
    errno: "ENOTFOUND",
    host: "trest",
    hostname: "trest",
    isAxiosError: true,
    message: "getaddrinfo ENOTFOUND trest trest:443",
    port: 443,
    response: undefined
  },
  400: {
    config: {},
    isAxiosError: true,
    message: "Request failed with status code 401",
    response: {
      status: 401,
      statusText: "Unauthorized",
      data: {
        errors: "[API] Invalid API key or access token (unrecognized login or wrong password)"
      },
      headers: { }
    }
  }
};
