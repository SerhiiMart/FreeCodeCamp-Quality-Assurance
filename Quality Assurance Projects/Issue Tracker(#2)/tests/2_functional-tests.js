const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server'); 
chai.use(chaiHttp);
let delReq;
        
suite('Functional Tests', function() {
  suite('Routing Tests', function() {
    suite('POST request to /api/issues/{project}', function() {
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
            delReq = res.body._id;
            assert.exists(res.body._id);
            assert.equal(res.body.issue_title, "Testing title");
            assert.equal(res.body.issue_text, "Testing text");
            assert.equal(res.body.created_by, "SerhiiMart");
            assert.equal(res.body.assigned_to, "SerhiiMart");
            assert.equal(res.body.status_text, "Don't know what's wrong");
            assert.exists(res.body.created_on);
            assert.exists(res.body.updated_on);
            assert.equal(res.body.open, true);
            done();
          });
      });

      test('Create an issue with only required fields', function(done) {
        chai.request(server)
          .post('/api/issues/{project}')
          .send({
            issue_title: "Testing title",
            issue_text: "Don't know what's wrong",
            created_by: "SerhiiMart"
          })
          .end(function (err, res) {
            assert.equal(res.status, 200,  "response status should be 200");
            assert.exists(res.body._id);
            assert.equal(res.body.issue_title, "Testing title");
            assert.equal(res.body.issue_text, "Don't know what's wrong");
            assert.equal(res.body.created_by, "SerhiiMart")
            assert.exists(res.body.assigned_to);
            assert.exists(res.body.status_text);
            assert.exists(res.body.created_on);
            assert.exists(res.body.updated_on);
            assert.equal(res.body.open, true);
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
assigned_to, open, status_text} = res.body[0];
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
          .get('/api/issues/apitest')
          .query({
            issue_title: "test title",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            const { issue_title } = res.body[0];
            assert.equal(issue_title, "test title");
            done();
          });
      });

      test('View issues on a project with multiple filters', function(done) {
        chai.request(server)
          .get('/api/issues/apitest')
          .query({
            issue_title: "test title",
            issue_text: "test text",
            created_by: "SerhiiMart"
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            const { issue_title, issue_text, created_by } = res.body[0];
            assert.deepEqual(issue_title, "test title");
            assert.equal(issue_text, "test text");
            assert.equal(created_by, "SerhiiMart");
            done();
          });
      });

    });

    suite('PUT request to /api/issues/{project}', function() {

      test('Update one field on an issue', function(done) {
          chai.request(server)
          .put("/api/issues/apitest")
          .send({
            _id: "60a4cca7bf54ae02ba60a93f",
            issue_title: "to be updated",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.result, "successfully updated");
            assert.equal(res.body._id, "60a4cca7bf54ae02ba60a93f");
            done();
          });

      });

      test('Update multiple fields on an issue', function(done) {
       chai
        .request(server)
        .put("/api/issues/apitest")
        .send({
          _id: "60a4cf8af67f980304103b9d",
          issue_title: "Update multiple fields",
          issue_text: "Random text",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.result, "successfully updated");
          assert.equal(res.body._id, "60a4cf8af67f980304103b9d");
          done();
        });
      });

      test('Update an issue with missing _id', function(done) {
         chai
        .request(server)
        .put("/api/issues/apitest")
        .send({ _id: "" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "missing _id");
          done();
        });
      });

      test('Update an issue with no fields to update', function(done) {
         chai
        .request(server)
        .put("/api/issues/apitest")
        .send({ _id: "6033921a6665a708caba04e4" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "no update field(s) sent");
          done();
        });
      });

      test('Update an issue with an invalid _id', function(done) {
          chai
        .request(server)
        .put("/api/issues/apitest")
        .send({
          _id: "60206843aebfdfg95a37einvalid",
          issue_title: "Update",
          issue_text: "update",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "could not update");
          done();
        });
      });
    });
  
    suite('DELETE request to /api/issues/{project}', function() 
    {
      test('Delete an issue', function(done) {
        chai.request(server)
        .delete('/api/issues/test')
        .send({
          _id: delReq
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.result, 'successfully deleted');
          assert.equal(res.body._id, delReq);
          done();
        });
      });

      test('Delete an issue with an invalid _id', function(done) {
    chai.request(server)
        const badId = "5f6dsgfghrtb6a504d";
        chai.request(server)
        .delete('/api/issues/test')
        .send({
          _id: badId
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'could not delete');
          assert.equal(res.body._id, badId);
          done();
        });
      });

      test('Delete an issue with missing _id', function(done) {
         chai.request(server)
        .delete("/api/issues/projects")
        .send({_id: ''})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "missing _id");
          done();
        });
      });
    });

  });


});
