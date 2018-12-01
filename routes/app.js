let express= require('express');
let app= express();

//Rutas
app.get('/', (req, res) => {
    res.send(200)
});

app.use('*', function(req, res){
    res.status(404).json({
        "status": 404,
        "errorCode": "RESOURCE_NOT_FOUND"
    })
});

module.exports = app;