const express = require('express');
const jira = require('./services/jira');
const _ = require('lodash');
const emvisage = require('./services/emvisage');
const bodyParser = require('body-parser');

const Controller = require('./controllers/controller');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get('/', Controller.online);
app.put('/issue', Controller.putJira);
app.post('/resource', Controller.postResource);
app.delete('/resource', Controller.deleteResource);
app.post('/issue', Controller.createJira);

app.post('/sync', Controller.sync);


app.listen(port, () => {
  console.log(`Middleware listening on port ${port}`)
  console.log('Environment is', process.env.NODE_ENV);
});
