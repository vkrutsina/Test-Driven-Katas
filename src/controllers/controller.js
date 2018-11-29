
const jira = require('../services/jira');
const _ = require('lodash');
const emvisage = require('../services/emvisage');
const axios = require('axios');

class Controller {

  static online(req, res) {
    return res.send('online');
  }

  static postResource(req, res) {
    const resource = req.body;
    console.log(resource);
    console.log(_.keys(req));

    emvisage
      .getMaterialResources(req.body.id)
      .then(resources => {

        if (resources.length > 0) {

          const updateResource = emvisage.mapData(req.body, resources[0]);
          const resourceId = resources[0].id;

          console.log("Updating Resource", updateResource);

          emvisage
            .editResource(resourceId, updateResource)
            .then(updateResourceResult => {
              console.log(`Resource: ${updateResourceResult}`);
              return res.send(updateResourceResult);
            })
            .catch(err => {
              console.error(err);
              return res.sendStatus(err.request.res.statusCode);
            });
        }
        else {
          const newResource = emvisage.mapData(req.body, {});

          console.log("Creating Resource", newResource);

          emvisage
            .createResource(newResource)
            .then(newResourceResult => {
              console.log(`Resource: ${newResourceResult}`);
              return res.send(newResourceResult);
            })
            .catch(err => {
              console.error(err);
              return res.sendStatus(err.request.res.statusCode);
            });
        }
      })
      .catch(err => {
        console.error(err);
        return res.sendStatus(err.request.res.statusCode);
      });
  }

  static putJira(req, res) {
    console.log(req.body);

    const issue = req.body;
    const issueIdOrKey = req.body.data.jiraID;

    jira.mapDataUpdate(req.body, issue);

    jira
      .editIssue(issueIdOrKey, issue)
      .then(issueResult => {

        console.log("Issue Updated");
        return res.send(issueResult);
      })
      .catch(err => {
        console.error(err);
        console.log(err.request.res.statusCode);
        return res.sendStatus(err.request.res.statusCode);
      });
  }

  static createJira(req, res) {

    const issue = req.body;
    console.log(issue);

    jira.mapDataCreate(req.body, issue);
    console.log(issue);

    jira
      .createIssue(issue)
      .then(issueResult => {

        console.log("Issue Created");

        return res.send(issueResult);
      })
      .catch(err => {
        console.error(err);
        console.log("status code is", err.request.res.statusCode);
        return res.sendStatus(err.request.res.statusCode);
      });
  }

  static deleteResource(req, res) {
    emvisage
      .deleteResource(req.params.resourceId)
      .then(resourceId => {
        res.send(resourceId);
      })
      .catch(err => {
        console.error(err);
        return res.send(err);
      });
  }

  static sync(req, res) {
    const port = process.env.PORT || 3000;

    console.log('Body is', req.body);

    axios.put(`http://localhost:${port}/issue`, req.body).then(r => {
      axios.post(`http://localhost:${port}/resource`, req.body).then(r2 => res.send('Okay'))
    });



      //res.send('okay');
  }
}
module.exports = Controller;