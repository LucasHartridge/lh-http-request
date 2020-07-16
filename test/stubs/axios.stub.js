'use strict';

const { sinon } = require('../test.service');

module.exports = {
  create: sinon.stub().returns({
    get: sinon.stub(),
    post: sinon.stub(),
    patch: sinon.stub(),
    postFile: sinon.stub(),
    delete: sinon.stub(),
    put: sinon.stub(),
    defaults: {
      baseURL: ''
    }
  }),
};
