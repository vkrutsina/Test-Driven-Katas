const express = require('express');
const jira = require('./services/jira');
const _ = require('lodash');

const app = express();
const port = 3000;


//testing
app.post('/test', (req, res) => res.send('Post yes!'));


//editing an issue - put from EMV to Jira
app.put('/issue', (req, res) => { 

    const issue = req.body;
    console.log(issue);
    
    jira.editIssues(issue).then(issue => {
        console.log(`Issue Status: ${issue.fields.status.name}`);
        return res.send(issue);

    }).catch(err => {
        console.error(err);
        return res.send(err);
    });
    
});

//get issue from Jira - currently only works with noted ID
app.get('/issue/:issueId', (req, res) => { 

    const issueId = req.params.issueId;
    

    jira.getIssues(issueId).then(issue => {
        console.log("Issue Test", issueId);
        res.send(issue);

    }).catch(err => {
        console.error("error", err);
        res.send(err.response);
    });
    
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
