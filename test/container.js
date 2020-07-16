'use strict';

const { asValue } = require('awilix');

const baseContainer = require('./../lib/container');
const { cloneContainer } = require('./test.service');

const container = cloneContainer(baseContainer);

const loggerStub = require('./stubs/logger.stub');
const axiosCookieJarSupport = require('./stubs/axiosCookieJarSupport.stub');
const toughCookie = require('./stubs/toughCookie.stub');
const axiosStub = require('./stubs/axios.stub');
const fsStub = require('./stubs/fs.stub');
const uuidStub = require('./stubs/uuid.stub');
const axiosResponseMock = require('./mocks/axios.mock');

// Stubs
container.register({
  logger: asValue(loggerStub),
  axiosCookieJarSupport: asValue(axiosCookieJarSupport),
  toughCookie: asValue(toughCookie),
  axios: asValue(axiosStub),
  fs: asValue(fsStub),
  uuid: asValue(uuidStub),
  axiosResponseMock: asValue(axiosResponseMock),
});

module.exports = container;
