const awilix = require('awilix');

const {
  createContainer,
  asValue,
  asFunction,
} = awilix;

const fs = require('fs');
const axios = require('axios').default;
const FormData = require('form-data');
const { uuid } = require('uuidv4');
const toughCookie = require('tough-cookie');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const config = require('../config');
const pino = require('pino')({
  name: 'LH Http-Request',
  level: config.LOG_LEVEL,
});

const requestService = require('./request.service');

const container = createContainer();
container.register({
  // Libs
  fs: asValue(fs),
  axios: asValue(axios),
  FormData: asValue(FormData),
  uuid: asValue(uuid),
  toughCookie: asValue(toughCookie),
  axiosCookieJarSupport: asValue(axiosCookieJarSupport),
  logger: asValue(pino),
  requestService: asFunction(requestService).singleton(),
});

module.exports = container;
