const express = require('express');
const jira = require('./services/jira');
const _ = require('lodash');
const emvisage = require('./services/emvisage');
const bodyParser = require('body-parser'); 

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

//creating an initiative in Jira from EMV 
app.put('/issue/:issueId', (req, res) => {

  const issue = req.body;
  console.log(issue);

  jira
    .createIssue(issue)
    .then(issue => {

      emvisage.mapData(req.body, issue);

      console.log("Issue Created");
      return res.send(issue);
    })
    .catch(err => {
      console.error(err);
      return res.send(err);
    });
});

//editing an issue - put from EMV to Jira
app.put('/issue/:issueId', (req, res) => {

  const issue = req.body;
  console.log(issue);

  jira
    .editIssues(issue)
    .then(issue => {
      
      emvisage.mapData(req.body, issue);

      console.log("Issue Updated");
      return res.send(issue);
    })
    .catch(err => {
      console.error(err);
      return res.send(err);
    });
});

//add resource from story to resource tab in EMV - EMV to EMV Resource post
app.post(`/resource`, (req, res) => {
  const resource = req.body;
  console.log(resource);
  console.log(_.keys(req));

  emvisage
    .getMaterialResources(req.body.id)
    .then(resources => {

      if(resources.length > 0) {

        emvisage.mapData(req.body, resources[0]);
        
        console.log("Updating Resource", resource);

        emvisage
          .editResource(newResource)
          .then(newResourceResult => {
            console.log(`Resource: ${newResourceResult}`);
            return res.send(newResourceResult);
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
