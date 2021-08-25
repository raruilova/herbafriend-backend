const boom = require('@hapi/boom');
const joi = require('@hapi/joi');

//validacion de datos

function validate(data, schema) {
    const {error} = joi.object(schema).validate(data);
    return error;
}

function validationHandler(schema, check = "body") { //checeo el body
    return function(req, res, next) {
        const error = validate(req[check], schema);
        error ? next(boom.badRequest(error)) : next(); //me devuelve que los datos no son validos, badRequest
    }
}

module.exports = validationHandler;