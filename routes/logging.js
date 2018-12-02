let express= require('express');
let app= express();
let loggingController = require('../controllers/loggingController')

//Rutas
app.post('/log',loggingController.log);

app.get('/statusLog', loggingController.statusLog);

app.get('/startLog', loggingController.startLog);

app.get('/stopLog', loggingController.stopLog);

app.get('/isUNQFYAlive', loggingController.isUNQFYAlive);

app.post('/hooks/slack/command', loggingController.slackCommand);

app.get('/hooks/slack/oauth', loggingController.slackOauth);

module.exports = app;