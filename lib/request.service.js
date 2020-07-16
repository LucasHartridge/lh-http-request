module.exports = ({
  fs, axios, FormData, uuid, axiosCookieJarSupport, toughCookie, logger,
}) => {
  const child = logger.child({ service: 'requestService' });
  let instanceClientHeaders = {};

  function handleRequestError(err) {
    let errObject = { message: err.message };
    if (err.response) {
      errObject = Object.assign(errObject, {
        status: err.response.status,
        statusText: err.response.statusText,
        data: err.response.data,
      });
      errObject = { message: err.message,
        status: err.response.status,
        statusText: err.response.statusText,
        data: err.response.data };
    }
    child.error(errObject);
    return errObject;
  }

  function buildUrl({ path, queryParams = {}, replacements = {} }) {
    let url = path;
    const params = Object.keys(queryParams).map(paramKey => `${paramKey}=${queryParams[paramKey]}`);
    if (params && params.length) {
      url = `${url}?${params.join('&')}`;
    }

    url = Object.keys(replacements).reduce(
      (acc, replacementKey) => acc.replace(replacementKey, replacements[replacementKey]), url,
    );

    return url;
  }

  function defaultHeaders() {
    const headers = {};
    headers['User-Agent'] = 'LH Http  Request Library';
    headers.Accept = 'application/json';
    headers['Accept-Language'] = 'en_US';
    headers['X-Request-Id'] = uuid();
    return headers;
  }

  function buildHeaders(customHeaders) {
    return {
      headers: { ...defaultHeaders(), ...instanceClientHeaders, ...customHeaders },
    };
  }

  function instance(client) {
    return {
      resetCookies() {
        client = axios.create({
          baseURL: client.defaults.baseURL,
          jar: new toughCookie.CookieJar(),
          withCredentials: true,
        });
        return instance(client);
      },
      updateBaseUrl(baseUrl) {
        client.defaults.baseURL = baseUrl;
        return instance(client);
      },
      async get({ url, headers }) {
        try {
          return await client.get(buildUrl(url), buildHeaders(headers));
        } catch (err) {
          return handleRequestError(err);
        }
      },
      async post({ url, payload, headers }) {
        try {
          return await client.post(buildUrl(url), payload, buildHeaders(headers));
        } catch (err) {
          return handleRequestError(err);
        }
      },
      async patch({ url, payload, headers }) {
        try {
          return await client.patch(buildUrl(url), payload, buildHeaders(headers));
        } catch (err) {
          return handleRequestError(err);
        }
      },
      async postFiles({ url, files, headers }) {
        try {
          const form = new FormData();
          files.forEach(file => {
            form.append(file.name, fs.createReadStream(file.path));
          });

          const fileHeaders = form.getHeaders();
          headers = { ...headers, ...fileHeaders };

          return await client.post(buildUrl(url), form, buildHeaders(headers));
        } catch (err) {
          return handleRequestError(err);
        }
      },
      async delete({ url, headers }) {
        try {
          return await client.delete(buildUrl(url), buildHeaders(headers));
        } catch (err) {
          return handleRequestError(err);
        }
      },
      async put({ url, payload, headers }) {
        try {
          return await client.put(buildUrl(url), payload, buildHeaders(headers));
        } catch (err) {
          return handleRequestError(err);
        }
      },
    };
  }

  function generateAxiosInstance({ baseUrl, cookie, clientHeaders = {} }) {
    const client = axios.create({
      baseURL: baseUrl,
      withCredentials: cookie,
      jar: new toughCookie.CookieJar(),
    });
    instanceClientHeaders = clientHeaders;
    axiosCookieJarSupport(client);
    return instance(client);
  }

  return {
    create({ baseUrl, cookie = false, clientHeaders = {} }) {
      if (!baseUrl) { throw Error('Please enter a base URL'); }
      child.debug(`Generating Axios Instance with Base Url: 
        ${baseUrl}. Cookies Set: ${cookie}. Headers Set: ${clientHeaders}`);
      return generateAxiosInstance({ baseUrl, cookie, clientHeaders });
    },
  };
};
