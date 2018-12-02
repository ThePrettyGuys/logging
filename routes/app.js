let express= require('express');
let app= express();
const errorCode = require('../errorCodes');

//Rutas
app.get('/', (req, res) => {
    res.status(200)
});

app.use('*', function(req, res){
    res.status(404).json({
        "status": 404,
        "errorCode": errorCode.RESOURCE_NOT_FOUND
    })
});

module.exports = app;