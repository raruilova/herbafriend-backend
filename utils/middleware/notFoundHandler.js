const boom = require('@hapi/boom');

function notFoundHandler(req, res) {
    const {
        output: {statusCode, payload}
    } = boom.notFound(); //me otorga el 4404 con su payload
    res.status(statusCode).json(payload);
}
module.exports = notFoundHandler