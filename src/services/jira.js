const axios = require('axios');
const config = require('../../config.json');

const _jira = axios.create({
  baseURL: `https://${config.host}.atlassian.net/rest/api/3`,
  headers: config.headers
});


class Jira {

  static getIssues(issueId) {
    return _jira.get(`/issue/${issueId}`).then(res => res.data);
  }

  static editIssues() {
    return _jira.editIssues(`/issue/${issueId}`).then(res => res.data);
  }

  static createIssue() {
    return _jira.createIssue(`/issue`).then(res => res.data);
  }

  static mapData(body, issue) {
    issue.id  = data.jiraID;
    issue.fields.summary = name;
    issue.fields.status.name = status;
    issue.fields.priority.name = data.priority;
    issue.fields.description = data.description;
    issue.fields.customfield_10023 = data.points;
    issue.fields.assignee.displayName = data.actor_assignee;
  
    return issue;
  }
}

module.exports = Jira;
