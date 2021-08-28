const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken'); 
const ApiKeysService = require('../services/apiKeys');
// sign-up
const UserService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');
const {createUserSchema} = require('../utils/schemas/users');
//
const {config} = require('../config');

//Basic strategy
require('../utils/auth/strategies/basic');

function authApi(app) {
    const router = express.Router();
    app.use('/api/auth', router);

    const apiKeyService = new ApiKeysService();
    const userService = new UserService();

    router.post('/sign-in', async function(req, res, next) {
        const {apiKeyToken} = req.body; //token que paso al sign in para determinar los permisos

        if(!apiKeyToken) {
            next(boom.unauthorized('apiKeyToken is required'));
        }

        passport.authenticate('basic', function(error, user) {
            try {
                if(error || !user) {
                    next(boom.unauthorized());
                }

                req.login(user, {session: false}, async function(error) {
                    if(error) {
                        next(error);
                    }

                    const apiKey = await apiKeyService.getApiKey({token: apiKeyToken});

                    if(!apiKey) {
                        next(boom.unauthorized());
                    }
                    //construir jwt 
                    const {_id: id, name, email} = user;

                    const payload = {
                        sub: id,
                        name,
                        email,
                        scopes: apiKey.scopes //token que encontramos con nuestro servicio
                    }

                    const token = jwt.sign(payload, config.authJwtSecret, {
                        expiresIn: '30 days'
                    });

                    return res.status(200).json({
                        token, user: {id, name, email}
                    });
                })
            } catch (error) {
                next(error);
            }
        })(req, res, next); //custom callback
    });

    // sign-up
    router.post('/sign-up', validationHandler(createUserSchema), async function(req, res, next){
        const {body: user} = req;

        try {
            const createdUserId = await userService.createUser({user});
            res.status(201).json({
                data: createdUserId,
                message: 'user created'
            })
        } catch (error) {
            next(error);
        }
    })
}

module.exports = authApi;

