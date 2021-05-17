'use strict';
const mongoose = require('mongoose');
const Issue = require('../models').Issue;
const Project = require('../models').Project;

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      
    })
    
    .post(function (req, res){
      let project = req.params.project;
      const {
        issue_title, issue_text, created_by, assigned_to, status_text
      } = req.body.project;
      if (!issue_title || !issue_text  || !created_by ){
        res.json("Required fields are missing");
        return;
      }
      const newIssue = new Issue({
        
      })
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
