const unqfyURL = "http://localhost:3000/";
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