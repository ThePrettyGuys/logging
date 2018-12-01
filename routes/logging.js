let express= require('express');
let app= express();
let loggingController = require('../controllers/loggingController')

//Rutas
//app.get('/log',loggingController.log);

app.get('/statusLog', loggingController.statusLog);

app.get('/startLog', loggingController.startLog);

app.get('/stopLog', loggingController.stopLog);

app.get('/isUNQFYAlive', loggingController.isUNQFYAlive);

module.exports = app;