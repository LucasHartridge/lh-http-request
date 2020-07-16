'use strict';

const chai = require('chai');
const sinon = require('sinon');
const http = require('chai-http');
const snapshots = require('chai-jest-snapshot');
const { createContainer } = require('awilix');

chai.use(snapshots);

chai.use(http);
const { expect } = chai;

before(function () {
  snapshots.resetSnapshotRegistry();
});

beforeEach(function () {
  snapshots.configureUsingMochaContext(this);
});


function cloneContainer(baseContainer) {
  const container = createContainer();
  container.register(baseContainer.registrations);
  return container;
}

module.exports = {
  chai, expect, sinon, cloneContainer
};
