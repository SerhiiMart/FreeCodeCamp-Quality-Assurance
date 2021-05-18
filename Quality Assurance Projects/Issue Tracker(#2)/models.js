const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  issue_title:  { type: String, require: true },
  issue_text: { type: String, require: true },
  created_on: { type: Date },
  updated_on: { type: Date },
  created_by: { type: String, require: true },
  assigned_to: { type: String },
  open: { type: Boolean, required: true },
  status_text: { type: String }
});

const Issue = mongoose.model('Issue', issueSchema);

const projectSchema = new Schema({
  name:  { type: String, require: true },
  issues: issueSchema,
});

const Project = mongoose.model('Project', projectSchema);

exports.Issue = Issue;
exports.Project = Project;
