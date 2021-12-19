const passport = require('passport');

const jwt = require('./strategies/jwt');
const local = require('./strategies/local');

passport.use(jwt);
passport.use(local);