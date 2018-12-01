const unqfyURL = "http://localhost:3000/";
const slackChannel = "https://hooks.slack.com/services/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"
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