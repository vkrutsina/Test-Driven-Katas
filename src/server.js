const express = require('express');
const jira = require('./services/jira');
const _ = require('lodash');
const emvisage = require('./services/emvisage');
const bodyParser = require('body-parser'); 

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('online'));

//creating an initiative in Jira from EMV 
app.post('/issue', (req, res) => {

  const issue = req.body;
  console.log(issue);

  jira.mapDataCreate(req.body, issue);
  console.log(issue);
  
  jira
    .createIssue(issue)
    .then(issueResult => {    

      console.log("Issue Created");
      
      return res.send(issueResult);

//then push to EMV to link the Jira ID - V2

    })
    .catch(err => {
      console.error(err);
      console.log("status code is", err.request.res.statusCode);
      return res.send(err);
    });
});

//editing an issue - put from EMV to Jira
app.put('/issue/:issueIdOrKey', (req, res) => {

  const issue = req.body;
  const issueIdOrKey = req.params.issueIdOrKey;

  console.log(issue);
  jira.mapDataUpdate(req.body, issue);

  jira
    .editIssue(issueIdOrKey, issue)
    .then(issueResult => {

      console.log("Issue Updated");
      return res.send(issueResult);
    })
    .catch(err => {
      console.error(err);
      console.log("status code is", err.request.res.statusCode);
      return res.send(err);
    });
});

//GET issue from Jira
app.get(`/issue/:issueIdOrKey`, (req, res) => {

  const issueIdOrKey = req.params.issueIdOrKey;

  jira
    .getIssue(issueIdOrKey)
    .then(issue => {
      console.log("Issue Get");
      res.send(issue);
    })
    .catch(err => {
      console.error(err);
      return res.send(err);
    });
});


//add or edit resource from story to resource tab in EMV - EMV to EMV Resource post
app.post(`/resource`, (req, res) => {
  const resource = req.body;
  console.log(resource);
  console.log(_.keys(req));

  emvisage
    .getMaterialResources(req.body.id)
    .then(resources => {

      if(resources.length > 0) {

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
            return res.send(err);
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
            return res.send(err);
          });
      }
    })
    .catch(err => {
      console.error(err);
      return res.send(err);
    });
});

//deleting a resource 
app.delete(`/resource/:resourceId`, (req, res) => {

  emvisage
    .deleteResource(req.params.resourceId)
    .then(resourceId => {
      res.send(resourceId);
    })
    .catch(err => {
      console.error(err);
      return res.send(err);
    });
});

app.listen(port, () => console.log(`Middleware listening on port ${port}`));
