
let mustLog = true;

exports.statusLog = function (req, res, next) {
    return res.status(200).json({ mustLog: mustLog}) 
} 

exports.startLog = function (req, res, next) {
    mustLog = true;
    return res.status(200).json({ mustLog: mustLog}) 
} 

exports.stopLog = function (req, res, next) {
    mustLog = false;
    return res.status(200).json({ mustLog: mustLog}) 
}