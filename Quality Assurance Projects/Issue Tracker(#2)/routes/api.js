'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Issue = require('../models').Issue;
const Project = require('../models').Project;
const ObjectID = require('mongodb').ObjectID;

module.exports = function (app) {

  app.route('/api/issues/:project')
    .get(function (req, res){
      let project = req.params.project;
      let filter = {};
      for (const field in req.query) {
        if (field === "_id") {
          console.log(req.query[field]);
          filter[field] = ObjectID(req.query[field]);
        } else {
          filter[field] = req.query[field];
        }
      }

      Project.findOne({ project_name: project }, (error, doc) => {
        if (error) res.send(`Error: ${error}`);
        if (!doc) res.send(`${project} does not exist.`);
        let filteredTracker = doc.project_issue_tracker.filter(issue => {
          for (const field in filter) {
            if (field === "_id") {
              return filter[field].toString() === issue[field].toString();
            }
            if (issue[field] !== filter[field]) return false;
          }
          return true;
        });
        if (filter._id) console.log("filter: ", filter, "filteredTracker: ", filteredTracker);
        res.json(filteredTracker);       
      });
    })
    
    .post(function (req, res){
      let project = req.params.project;
      const issue = new Issue({
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text
      });

      if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by) {
        res.json({ error: 'required field(s) missing' });
      } else {
        Project.findOne({ project_name: project }, (error, doc) => {
          if (error) {
            res.send(`Error: ${error}`);
          } else if (doc) {
            doc.project_issue_tracker.push(issue);
            doc.save((error) => {
              error ? res.send(`Error: ${error}`) : res.json(issue);
            });
          } else {
            Project.create({
              project_name: project,
              project_issue_tracker: [issue]
            });
            res.json(issue);
          }
        });
      }
    })
    
    .put(function (req, res){
      let project = req.params.project;
      let update = { updated_on: new Date() };
      
      for (const field in req.body) {
        if (req.body[field]) update[field] = req.body[field];
      }
      if (!req.body._id) {
        res.json({ error: 'missing _id' });
      } else if (Object.keys(update).length < 3) { 
        res.json({ error: 'no update field(s) sent', '_id': req.body._id });
      } else {
        Project.findOne({ "project_name": project }, (error, doc) => {
          const index = doc.project_issue_tracker.findIndex(issue => issue._id.toString() === req.body._id);

          if (error || !doc || index === -1) {
            res.json({ error: 'could not update', '_id': req.body._id });
          } else {
            for (const field in update) {
              doc.project_issue_tracker[index][field] = update[field];
            }
            doc.save((error, doc) => {
              if (error || !doc) {
                res.json({ error: 'could not update', '_id': req.body._id });
              } else {
                res.json({ result: 'successfully updated', '_id': req.body._id });
              }
            });
          }
        });
      }
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      if (!req.body._id) {
        res.json({ error: 'missing _id' });
      } else {
        Project.findOne({ "project_name": project }, (error, doc) => {
          const index = doc.project_issue_tracker.findIndex(issue => issue._id.toString() === req.body._id);
          if (index === -1 || error) {
            res.json({ error: 'could not delete', '_id': req.body._id });
          } else {
            doc.project_issue_tracker.splice(index, 1);
            doc.save(error => `${error} saving document.`);
            res.json({ result: 'successfully deleted', '_id': req.body._id });
          }
        });
      } 

    });
};