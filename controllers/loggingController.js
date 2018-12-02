const rp = require('request-promise');
const errorCode = require('../errorCodes');
const unqfyURL = require('../config/config').UNQFYURL;
const slackChannel = require('../config/config').SLACKCHANNELURL;
const slackCLientId = require('../config/config').SLACKCLIENTID;
const slackCLientSecret = require('../config/config').SLACKCLIENTSECRET;
let mustLog = require('../config/config').MUSTLOG;
const slackOAuthAcessUrl = require('../config/config').SLACKOAUTHACESSURL;

const ACTIVATED = "activated";
const STOPPED = "stopped";

exports.statusLog = function (req, res) {
    status = mustLog ? ACTIVATED : STOPPED;
    return res.status(200).json({ logServiceStatus: status});
}; 

exports.startLog = function (req, res) {
    mustLog = true;
    return res.status(200).json({ logService: ACTIVATED});
};

exports.stopLog = function (req, res) {
    mustLog = false;
    return res.status(200).json({ logService: STOPPED})
};

exports.isUNQFYAlive = function (req, res) {
    const options = {
        url: unqfyURL,
        json: true,
    };
    return rp.get(options)
        .then (() => { return res.status(200).json({isAlive: "true" }) } )
        .catch(() => { return res.status(404).json({isAlive: "false"}) } )
};

exports.log = function (req, res, next) {
    const textToLog = req.body.text;
    const hasTextToLog = Boolean(textToLog);
    if(!hasTextToLog){
        res.status(400).json({status: 400, errorCode: errorCode.BAD_REQUEST})
    }

    if (mustLog) {
        return logIn(slackChannel, textToLog, res);
    } else {
        return res.status(418).json({ logService: `Log service is ${STOPPED}` });
    }
};

exports.slackCommand = function (req, res, next) {
    const runningMessage = "Unqfy Logging Service is up and running!!!";
    const stoppedMessage = "Unqfy Logging Service is down!!!";

    let status = mustLog ? runningMessage : stoppedMessage;
    res.send(status);
};

exports.slackOauth = function(req, res, next) {
    const slackCode = req.query.code;
    if (!slackCode) {
        res.status(500);
        const errorMessage = "Looks like we're not getting code.";
        res.send({ Error: errorMessage });
        console.log(errorMessage);
    } else {
        return slackAuth(slackCode, res);
    }
};

function logIn(slackChannel, textToLog, res) {
    const options = {
        url: slackChannel,
        body: { text: textToLog },
        json: true,
    };

    return rp.post(options)
        .then((response) => {
            return res.status(200).json({ response: response });
        })
        .catch(() => res.status(404).json({ status: 404, errorCode: errorCode.RELATED_RESOURCE_NOT_FOUND }));
}

function slackAuth(slackCode, res) {
    const options = {
        url: slackOAuthAcessUrl,
        qs: {code: slackCode, client_id: slackCLientId, client_secret: slackCLientSecret}
    };

    return rp.get(options)
        .then(res.json)
        .catch(console.log)
}