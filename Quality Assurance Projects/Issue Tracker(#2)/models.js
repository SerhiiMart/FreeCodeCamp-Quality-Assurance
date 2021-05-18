const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  issue_title: {type: String, required: true },
  issue_text: {type: String, required: true },
  created_on: { type: String, default: Date() },
  updated_on: { type: String, default: Date() },
  created_by: {type: String, required: true },
  assigned_to: { type: String, default: "" },
  open: { type: Boolean, default: true },
  status_text: { type: String, default: "" }
});

const projectSchema = new Schema({
  project_name: {type: String },
  project_issue_tracker: [issueSchema]
});

const Issue = mongoose.model('Issue', issueSchema);
const Project = mongoose.model('Project', projectSchema);

exports.Issue = Issue;
exports.Project = Project;
