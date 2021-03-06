const express = require('express');

const app = express();

const cors = require('cors');

const {config} = require('./config');
const recipesApi = require('./routes/recipes');
const authApi = require('./routes/auth');
//middlewares
const {logError, errorHandler, wrapError } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
//

//cors 
app.use(cors());

//body parcer
app.use(express.json()); //para que interprete json
//

authApi(app);
recipesApi(app);

// uso de middlewares -- simpre al final de las rutas
app.use(logError);
app.use(wrapError);
app.use(errorHandler);
//
//error 404
app.use(notFoundHandler); //debe ir siempre al final de las rutas
//

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
})