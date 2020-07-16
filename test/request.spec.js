'use strict';

const { sinon, expect } = require('./test.service');
const container = require('./container');
const fsStub = container.resolve('fs');
const axiosMocks = container.resolve('axiosResponseMock');
const axios = container.resolve('axios');
const axiosCookieJarSupport = container.resolve('axiosCookieJarSupport');

const baseUrl = 'http://test';
const cookie = true;
const clientHeaders= {"Foo":"Bar"}
const requestService = container
  .resolve('requestService')
  .create({ baseUrl, cookie , clientHeaders});

describe('LH Http Request tests', () => {
  let reqUuid = 'uuidValueShouldBeReturned';

  beforeEach(() => {
    sinon.resetHistory();
  });

  const url = {
    path: '/client'
  };
  const payload = {
    a: 1,
    b: 2,
    c: 'walla'
  };
  const headers = {
    'My-header': '123'
  };
  describe('GET', () => {
    it('should call the get method in axios', async () => {
      await requestService.get({ url });
      sinon.assert.calledOnce(axios.create().get);
    });
    it('should call the get method with the right url', async () => {
      await requestService.get({ url });
      expect(axios.create().get.firstCall.args[0]).to.eql(url.path);
    });

    it('should pass the uuid v4 as a header', async () => {
      await requestService.get({ url });
      expect(axios.create().get.firstCall.args[1].headers['X-Request-Id']).to.eql(reqUuid);
    });

    it('should accept custom headers', async () => {
      await requestService.get({ url, headers });
      expect(axios.create().get.firstCall.args[1].headers['My-header']).to.eql(
        headers['My-header']
      );
    });

    it('should use client headers', async () =>{
      await requestService.get({ url, headers });
      expect(axios.create().get.firstCall.args[1].headers.Foo).to.eql('Bar');
    })

    it('should replace custom path', async () => {
      const url = {
        path: '/clients/:clientId',
        replacements: {
          ':clientId': 1
        }
      };
      const expectedUrl = '/clients/1';
      await requestService.get({ url, headers });
      expect(axios.create().get.firstCall.args[0]).to.eql(expectedUrl);
    });

    it('should replace query params', async () => {
      const url = {
        path: '/clients',
        queryParams: {
          id: 1,
          name: 'test'
        }
      };
      const expectedUrl = '/clients?id=1&name=test';
      await requestService.get({ url, headers });
      expect(axios.create().get.firstCall.args[0]).to.eql(expectedUrl);
    });

    it('should handle non 2XX responses and return them correctly', async () => {
      axios.create().get.throws(axiosMocks['400']);
      const res = await requestService.get({ url, headers });
      expect(res.message).to.eql(axiosMocks['400'].message)
    });

    it('should handle connection errors and return the message', async () => {
      axios.create().get.throws(axiosMocks['error']);
      const res = await requestService.get({ url, headers });
      expect(res.message).to.eql(axiosMocks['error'].message);
    });
  });
  describe('POST', () => {
    it('should call the post method in axios', async () => {
      await requestService.post({ url, payload });
      sinon.assert.calledOnce(axios.create().post);
    });

    it('should call the post method with the right url and payload', async () => {
      await requestService.post({ url, payload });
      expect(axios.create().post.firstCall.args[0]).to.eql(url.path);
      expect(axios.create().post.firstCall.args[1]).to.eql(payload);
    });

    it('should pass the uuid v4 as a header', async () => {
      await requestService.post({ url, payload });
      expect(axios.create().post.firstCall.args[2].headers['X-Request-Id']).to.eql(reqUuid);
    });

    it('should accept custom headers', async () => {
      await requestService.post({ url, payload, headers });
      expect(axios.create().post.firstCall.args[2].headers['My-header']).to.eql(
        headers['My-header']
      );
    });

    it('should replace custom path', async () => {
      const url = {
        path: '/clients/:clientId',
        replacements: {
          ':clientId': 1
        }
      };
      const expectedUrl = '/clients/1';
      await requestService.post({ url, headers });
      expect(axios.create().post.firstCall.args[0]).to.eql(expectedUrl);
    });

    it('should replace query params', async () => {
      const url = {
        path: '/clients',
        queryParams: {
          id: 1,
          name: 'test'
        }
      };
      const expectedUrl = '/clients?id=1&name=test';
      await requestService.post({ url, headers });
      expect(axios.create().post.firstCall.args[0]).to.eql(expectedUrl);
    });

    it('should handle non 2XX responses and return them correctly', async () => {
      axios.create().post.throws(axiosMocks['400']);
      const res = await requestService.post({ url, headers });
      expect(res.message).to.eql(axiosMocks['400'].message)
    });

    it('should handle connection errors and return the message', async () => {
      axios.create().post.throws(axiosMocks['error']);
      const res = await requestService.post({ url, headers });
      expect(res.message).to.eql(axiosMocks['error'].message);
    });
  });
  describe('PATCH', () => {
    it('should call the patch method in axios', async () => {
      await requestService.patch({ url, payload });
      sinon.assert.calledOnce(axios.create().patch);
    });

    it('should call the patch method with the right url and payload', async () => {
      await requestService.patch({ url, payload });
      expect(axios.create().patch.firstCall.args[0]).to.eql(url.path);
      expect(axios.create().patch.firstCall.args[1]).to.eql(payload);
    });

    it('should pass the uuid v4 as a header', async () => {
      await requestService.patch({ url, payload });
      expect(axios.create().patch.firstCall.args[2].headers['X-Request-Id']).to.eql(reqUuid);
    });

    it('should accept custom headers', async () => {
      await requestService.patch({ url, payload, headers });
      expect(axios.create().patch.firstCall.args[2].headers['My-header']).to.eql(
        headers['My-header']
      );
    });

    it('should replace custom path', async () => {
      const url = {
        path: '/clients/:clientId',
        replacements: {
          ':clientId': 1
        }
      };
      const expectedUrl = '/clients/1';
      await requestService.patch({ url, headers });
      expect(axios.create().patch.firstCall.args[0]).to.eql(expectedUrl);
    });

    it('should replace query params', async () => {
      const url = {
        path: '/clients',
        queryParams: {
          id: 1,
          name: 'test'
        }
      };
      const expectedUrl = '/clients?id=1&name=test';
      await requestService.patch({ url, headers });
      expect(axios.create().patch.firstCall.args[0]).to.eql(expectedUrl);
    });

    it('should handle non 2XX responses and return them correctly', async () => {
      axios.create().patch.throws(axiosMocks['400']);
      const res = await requestService.patch({ url, headers });
      expect(res.message).to.eql(axiosMocks['400'].message)
    });

    it('should handle connection errors and return the message', async () => {
      axios.create().patch.throws(axiosMocks['error']);
      const res = await requestService.patch({ url, headers });
      expect(res.message).to.eql(axiosMocks['error'].message);
    });
  });

  describe('FILE POST', () => {
    let file;
    beforeEach(() => {
      file = './mock.feature';
      fsStub.createReadStream.onFirstCall().returns('some-string');
    });

    it('should call the post method in axios', async () => {
      await requestService.postFiles({
        url,
        files: [{ name: 'file', path: file }]
      });
      sinon.assert.calledOnce(axios.create().post);
    });

    it('should call the post method with the right url', async () => {
      await requestService.postFiles({
        url,
        files: [{ name: 'file', path: file }]
      });
      expect(axios.create().post.firstCall.args[0]).to.eql(url.path);
    });

    it('should pass the uuid v4 as a header', async () => {
      await requestService.postFiles({
        url,
        files: [{ name: 'file', path: file }]
      });
      expect(axios.create().post.firstCall.args[2].headers['X-Request-Id']).to.eql(reqUuid);
    });

    it('should accept custom headers', async () => {
      await requestService.postFiles({
        url,
        files: [{ name: 'file', path: file }],
        headers
      });
      expect(axios.create().post.firstCall.args[2].headers['My-header']).to.eql(
        headers['My-header']
      );
    });

    it('should replace custom path', async () => {
      const url = {
        path: '/clients/:clientId',
        replacements: {
          ':clientId': 1
        }
      };
      const expectedUrl = '/clients/1';
      await requestService.postFiles({
        url,
        files: [{ name: 'file', path: file }]
      });
      expect(axios.create().post.firstCall.args[0]).to.eql(expectedUrl);
    });

    it('should replace query params', async () => {
      const url = {
        path: '/clients',
        queryParams: {
          id: 1,
          name: 'test'
        }
      };
      const expectedUrl = '/clients?id=1&name=test';
      await requestService.postFiles({
        url,
        files: [{ name: 'file', path: file }]
      });
      expect(axios.create().post.firstCall.args[0]).to.eql(expectedUrl);
    });

    it('should handle non 2XX responses and return them correctly', async () => {
      axios.create().post.throws(axiosMocks['400']);
      const res = await requestService.postFiles({
        url,
        files: [{ name: 'file', path: file }]
      });
      expect(res.message).to.eql(axiosMocks['400'].message)
    });

    it('should handle connection errors and return the message', async () => {
      axios.create().post.throws(axiosMocks['error']);
      const res = await requestService.postFiles({
        url,
        files: [{ name: 'file', path: file }]
      });
      expect(res.message).to.eql(axiosMocks['error'].message)
    });
  });

  describe('DELETE', () => {
    it('should call the delete method in axios', async () => {
      await requestService.delete({ url });
      sinon.assert.calledOnce(axios.create().delete);
    });

    it('should call the delete method with the right url', async () => {
      await requestService.delete({ url });
      expect(axios.create().delete.firstCall.args[0]).to.eql(url.path);
    });

    it('should pass the uuid v4 as a header', async () => {
      await requestService.delete({ url });
      expect(
        axios.create().delete.firstCall.args[1].headers['X-Request-Id']
      ).to.eql(reqUuid);
    });

    it('should accept custom headers', async () => {
      await requestService.delete({ url, headers });
      expect(axios.create().delete.firstCall.args[1].headers['My-header']).to.eql(
        headers['My-header']
      );
    });

    it('should replace custom path', async () => {
      const url = {
        path: '/clients/:clientId',
        replacements: {
          ':clientId': 1
        }
      };
      const expectedUrl = '/clients/1';
      await requestService.delete({ url, headers });
      expect(axios.create().delete.firstCall.args[0]).to.eql(expectedUrl);
    });

    it('should replace query params', async () => {
      const url = {
        path: '/clients',
        queryParams: {
          id: 1,
          name: 'test'
        }
      };
      const expectedUrl = '/clients?id=1&name=test';
      await requestService.delete({ url, headers });
      expect(axios.create().delete.firstCall.args[0]).to.eql(expectedUrl);
    });

    it('should handle non 2XX responses and return them correctly', async () => {
      axios.create().delete.throws(axiosMocks['400']);
      const res = await requestService.delete({ url, headers });
      expect(res.message).to.eql(axiosMocks['400'].message)
    });

    it('should handle connection errors and return the message', async () => {
      axios.create().delete.throws(axiosMocks['error']);
      const res = await requestService.delete({ url, headers });
      expect(res.message).to.eql(axiosMocks['error'].message);
    });
  });

  describe('PUT', () => {
    it('should call the patch method in axios', async () => {
      await requestService.put({ url, payload });
      sinon.assert.calledOnce(axios.create().put);
    });

    it('should call the put method with the right url and payload', async () => {
      await requestService.put({ url, payload });
      expect(axios.create().put.firstCall.args[0]).to.eql(url.path);
      expect(axios.create().put.firstCall.args[1]).to.eql(payload);
    });

    it('should pass the uuid v4 as a header', async () => {
      await requestService.put({ url, payload });
      expect(axios.create().put.firstCall.args[2].headers['X-Request-Id']).to.eql(reqUuid);
    });

    it('should accept custom headers', async () => {
      await requestService.put({ url, payload, headers });
      expect(axios.create().put.firstCall.args[2].headers['My-header']).to.eql(
        headers['My-header']
      );
    });

    it('should replace custom path', async () => {
      const url = {
        path: '/clients/:clientId',
        replacements: {
          ':clientId': 1
        }
      };
      const expectedUrl = '/clients/1';
      await requestService.put({ url, headers });
      expect(axios.create().put.firstCall.args[0]).to.eql(expectedUrl);
    });

    it('should replace query params', async () => {
      const url = {
        path: '/clients',
        queryParams: {
          id: 1,
          name: 'test'
        }
      };
      const expectedUrl = '/clients?id=1&name=test';
      await requestService.put({ url, headers });
      expect(axios.create().put.firstCall.args[0]).to.eql(expectedUrl);
    });

    it('should handle non 2XX responses and return them correctly', async () => {
      axios.create().put.throws(axiosMocks['400']);
      const res = await requestService.put({ url, headers });
      expect(res.message).to.eql(axiosMocks['400'].message)
    });

    it('should handle connection errors and return the message', async () => {
      axios.create().put.throws(axiosMocks['error']);
      const res = await requestService.put({ url, headers });
      expect(res.message).to.eql(axiosMocks['error'].message);
    });
  });

  describe('RESET COOKIES', () => {
    it('should reset the cookies', async () => {
      const updatedInstance = requestService.resetCookies();
      expect(updatedInstance).to.not.be.equal(requestService);
    });
  });

  describe('UPDATE BASE URL', () => {
    it('should update the base url for a new request', async () => {
      requestService.updateBaseUrl('http://updatedBaseUrl');
      await requestService.get({ url });
      expect(axios.create().defaults.baseURL).to.eql('http://updatedBaseUrl')
    });
  });

  describe('LIBRARY INITIALIZATION', () => {
    it('should return an error if base url is not passed', async () => {
      try {
        container.resolve('requestService').create({baseUrl: null}); 
      } catch (err) {
        expect(err.message).to.eql('Please enter a base URL');
      }
    });
    it('should create a new instance with specific headers', async () => {
      const clientHeaders = {};
      const myInstance = container.resolve('requestService').create({baseUrl, cookie, clientHeaders});
      expect(myInstance).to.not.be.null
    });
  });
});
