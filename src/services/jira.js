const axios = require('axios');
const config = require('../../config.json');
const _ = require('lodash');

const _jira = axios.create({
  baseURL: `https://${config.host}.atlassian.net/rest/api/3`,
  headers: config.headers
});

class Jira {

  static getIssue(issueIdOrKey) {
    return _jira
      .get(`/issue/${issueIdOrKey}`)
      .then(res => res.data);
  }

  static editIssue(issueIdOrKey, issue) {
    return _jira
      .put(`/issue/${issueIdOrKey}`, issue)
      .then(res => res.data);
  }

  static createIssue(issue) {
    return _jira
      .post(`/issue`, issue)
      .then(res => res.data);
  }

  static mapDataCreate(body, issue) {
    issue.fields = {};
    issue.fields.summary = body.name;
    issue.fields.issuetype = { 'id': '10008' };
    issue.fields.project = { 'id': '10001' };
    issue.fields.assignee = { 'name': body.data.assigneeName }

    delete issue.data;
    delete issue.id;
    delete issue.name;
    delete issue.status;
    delete issue.meta;

    return issue;
  }

  static mapDataUpdate(body, issue) {
    issue.fields = {};
    issue.fields.summary = body.name;
    issue.fields.issuetype = { 'id': '10001' };
    issue.fields.project = { 'id': body.data.projectId };
    issue.fields.customfield_10023 = body.data.points;
    issue.fields.assignee = { 'name': body.data.assigneeName };

    delete issue.data;
    delete issue.name;
    delete issue.meta;

    return issue;
  }
}

module.exports = Jira;
