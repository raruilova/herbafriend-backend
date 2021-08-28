const joi = require('@hapi/joi');

const { recipeIdSchema } = require('./recipes');
const { userIdSchema } = require('./users');

const userRecipeIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createRecipeSchema = {
    userId: userIdSchema,
    recipeId: recipeIdSchema
};

module.exports = {
    userRecipeIdSchema,
    createRecipeSchema
}

