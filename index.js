const express = require('express');

const app = express();

const {config} = require('./config');
const recipesApi = require('./routes/recipes');

recipesApi(app);


app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
})