const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

//sign-up
const UserService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');
const { createUserSchema } = require('../utils/schemas/user');
//
const { config } = require('../config');

//strategy
require('../utils/auth');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const userService = new UserService();

  router.post(
    '/sign-in',
    passport.authenticate('local', { session: false }),
    async function (req, res, next) {
      try {
        const user = req.user;
        const { _id: id, name, email } = user;
        const payload = {
          sub: id,
          name,
          email,
        };

        const token = jwt.sign(payload, config.authJwtSecret);
        res.json({
          user,
          token,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/sign-up',
    validationHandler(createUserSchema),
    async function (req, res, next) {
      const { body: user } = req;
      try {
        const createUserId = await userService.createUser({ user });

        res.status(201).json({
          data: createUserId,
          message: 'user created',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = authApi;
