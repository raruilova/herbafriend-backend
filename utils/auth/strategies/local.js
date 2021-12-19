const {Strategy} = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('../../../services/users');

const service = new UserService();

const localStrategy = new Strategy({ //personalizo el body para logueo
    usernameField: 'email',
    passwordField: 'password'
},
    async (email, password, done) => {
    try {
        const user = await service.getUser(email);
        if(!user) {
            done(boom.unauthorized(), false);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            done(boom.unauthorized(), false);
        }
        delete user.password;
        done(null, user); //ejecute el done, no hubo ningun error
    } catch (error) {
        done(error, false); //falsa ya que no fue posible la validacion
    }
});

module.exports = localStrategy;