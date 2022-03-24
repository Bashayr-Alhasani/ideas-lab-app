const request = require('supertest');
const app = require('../server');

//==================== article API test ====================

/**
 * Testing get all articles endpoint
 */
describe('GET /api/articles', function () {
    it('respond with json containing a list of all artilces', function (done) {
        request(app)
            .get('/api/articles')
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(200, done);
    });
});


/**
 * Testing get available articles endpoint
 */
describe('GET /api/articles/available', function () {
  it('respond with json containing a list of available articles', function (done) {
      request(app)
          .get('/api/articles/available')
          .set('Accept', 'application/json')
          .expect('Content-Type', /text/)
          .expect(200, done);
  });
});