const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server'); 
chai.use(chaiHttp);
        
suite('Functional Tests', function() {
  suite('Routing Tests', function() {
    suite('POST request to /api/issues/{project}  => object with issue data', function() {
      test('Create an issue with every field', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title: "Testing title",
            issue_text: "Testing text",
            created_by: "SerhiiMart",
            assigned_to: "SerhiiMart",
            status_text: "Don't know what's wrong"
          })
          .end(function (err, res) {
            assert.equal(res.status, 200, "response status should be 200");
            assert.equal(res.body.issue_title, "Testing title");
            assert.equal(res.body.issue_text, "Testing text");
            assert.equal(res.body.created_by, "SerhiiMart");
            assert.equal(res.body.assigned_to, "SerhiiMart");
            assert.equal(res.body.status_text, "Don't know what's wrong");
            done();
          });
      });

      test('Create an issue with only required fields:', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title: "Testing title",
            issue_text: "Don't know what's wrong",
            created_by: "SerhiiMart",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200,  "response status should be 200");
            assert.exists(res.body._id);
            assert.equal(res.body.issue_title, "Testing title");
            assert.equal(res.body.issue_text, "Don't know what's wrong");
            assert.equal(res.body.created_by, "SerhiiMart");
            done();
          });
      });

      test('Create an issue with missing required fields', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title: "Testing issue with missing required fields",
          })
          .end(function (err, res) {
            assert.equal(res.body.error, "required field(s) missing");
            done();
          });
      });

    });

    suite('GET request to /api/issues/{project}', function() {

      test('View issues on a project', function(done) {
        chai.request(server)
          .get('/api/issues/test')
          .end(function (err, res) {
            const { _id, issue_title, issue_text, created_on, updated_on, created_by,
assigned_to, open, status_text} = res.body[0] || {};
            assert.exists(_id);
            assert.exists(issue_title);
            assert.exists(issue_text);
            assert.exists(created_on);
            assert.exists(updated_on);
            assert.exists(created_by);
            assert.exists(assigned_to);
            assert.exists(open);
            assert.exists(status_text);
            done();
          });
      });

      test('View issues on a project with one filter', function(done) {
        chai.request(server)
          .get('/api/issues/test')
          .query({
            issue_title: "test",
          })
          .end(function (err, res) {
             assert.equal(res.status, 200);
            const { issue_title } = res.body[0] || {};
            assert.equal(issue_title, "test");
            done();
          });
      });

      test('View issues on a project with multiple filters', function(done) {
        chai.request(server)
          .get('/api/issues/test')
          .query({
            issue_title: "test",
            issue_text: "test",
            created_by: "SerhiiMart"
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            const { issue_title, issue_text, created_by } = res.body[0] || {};
            assert.deepEqual(issue_title, "test");
            assert.equal(issue_text, "test");
            assert.equal(created_by, "SerhiiMart");
            done();
          });
      });

    });

    suite('PUT request to /api/issues/{project}', function() {

      test('Update one field on an issue', function(done) {
        done();

      });

      test('Update multiple fields on an issue', function(done) {
        done();

      });

      test('Update an issue with missing _id', function(done) {
        done();

      });

      test('Update an issue with no fields to update', function(done) {
        done();

      });

      test('Update an issue with an invalid _id', function(done) {
        done();

      });

    });

    suite('DELETE request to /api/issues/{project}', function() {

      test('Delete an issue', function(done) {
        done();

      });

      test('Delete an issue with an invalid _id', function(done) {
        done();

      });

      test('Delete an issue with missing _id', function(done) {
        done();

      });

    });

  });


});
