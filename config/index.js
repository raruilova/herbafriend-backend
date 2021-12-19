//variables de entorno
require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,

  cors: process.env.CORS,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_host: process.env.DB_HOST,
  db_name: process.env.DB_NAME,
  // auth
  authJwtSecret: process.env.AUTH_JWT_SECRET,
};

module.exports = { config };
