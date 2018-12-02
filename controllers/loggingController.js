const unqfyURL = "http://localhost:3000/";
const slackChannel = "https://hooks.slack.com/services/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"
const slackCLientId = "421083284737.493576568229";
const slackCLientSecret = "367f559e5a108459414119c8e0d9747b";
const rp = require('request-promise');
let mustLog = true;

exports.statusLog = function (req, res, next) {
    status= "activated";    
    if(!mustLog){
        status = "stopped" 
    };
    return res.status(200).json({ logService: status}); 
}; 

exports.startLog = function (req, res, next) {
    mustLog = true;
    return res.status(200).json({ logService: "activated"}); 
}; 

exports.stopLog = function (req, res, next) {
    mustLog = false;
    return res.status(200).json({ logService: "stopped"}) 
};

exports.isUNQFYAlive = function (req, res, next) {
    const options = {
        url: `${unqfyURL}`,
        json: true,
    };
    return rp.get(options)
        .then ((response) => { return res.status(200).json({isAlive: "true" }) } )
        .catch((response) => { return res.status(404).json({isAlive: "false"}) } )
};

exports.log = function (req, res, next) {
    if(!req.body.text){ res.status(400).json({status: 400, errorCode: "BAD_REQUEST"}) }
    text= req.body.text
    const options = {
        url: `${slackChannel}`,
        body: {
            "text": text
        },
        json: true,
    };

    return rp.post(options)
        .then( (response) => { return res.status(200).json({response: response}) } )
        .catch(() => res.status(404).json({status: 404, errorCode: "RELATED_RESOURCE_NOT_FOUND"}))
};

exports.slackCommand = function (req, res, next) {
    let status = mustLog ? "Unqfy Logging Service is up and running!!!" : "Unqfy Logging Service is down!!!"
    res.send(status);
};

exports.slackOauth = function(req, res, next) {
    if (!req.query.code) {
        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
    } else {
        request({
            url: 'https://slack.com/api/oauth.access',
            qs: {code: req.query.code, client_id: slackCLientId, client_secret: slackCLientSecret},
            method: 'GET',

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                res.json(body);

            }
        })
    }
};