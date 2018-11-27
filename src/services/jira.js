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

  static getCurrentUser() {
    return _jira.getCurrentUser();
  }

  static editIssues() {
    return _jira.editIssues();
  }
}

module.exports = Jira;
