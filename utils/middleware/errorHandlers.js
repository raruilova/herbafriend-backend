const boom = require('@hapi/boom'); //para errores de status mas claros
const {config} = require('../../config');

function withErrorStack(error, stack){
    if(config.dev) {
        return {...error, stack}
    }

    return error;
}

function logError(err, req, res, next){
    console.log(err);
    next(err);
}

function wrapError(err,req, res, next) {
    if(!err.isBoom) {
        next(boom.badImplementation(err)); //marca el error
    }

    next(err);
}

function errorHandler(err, req, res, next) {
    const {output: {statusCode, payload}} = err;
    res.status(statusCode); //detemino su satus si lo tiene en error, eso me da boom con el output
    res.json(withErrorStack(payload, err.stack)); //devuelvo en json mi error y mi stack
}

module.exports = {
    logError, 
    wrapError,
    errorHandler
}
