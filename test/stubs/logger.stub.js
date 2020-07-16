'use strict'

const { sinon } = require('../test.service');

module.exports = {
  child: sinon.stub().returns({
    info: sinon.stub(),
    error: sinon.stub(),
    debug: sinon.stub()
  }),
}