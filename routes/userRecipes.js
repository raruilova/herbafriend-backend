const express = require('express');

const UserRecipesService = require('../services/userRecipes');
const validationHandler = require('../utils/middleware/validationHandler');

const { recipeIdSchema } = require('../utils/schemas/recipes');
const { userIdSchema } = require('../utils/schemas/users');
const { createRecipeSchema } = require('../utils/schemas/userRecipes');

function userRecipesApi(app) {
    const router = express.Router();
    app.use('/api/user-recipes', router);

    const userRecipesService = new UserRecipesService();

    router.get('/', validationHandler({userId: userIdSchema}, 'query'), async function(req, res, next) {
        const {userId} = req.query;

        try {
            const userRecipes = await userRecipesService.getUserRecipes({userId});
            res.status(200).json({
                data: userRecipes,
                message: 'user recipes listed'
            })
        } catch (error) {
            next(error);
        }
    });

    //create
    router.post('/', validationHandler(createRecipeSchema), async function(req, res, next) {
        const {body: userRecipe} = req;

        try {
            const createRecipeId = await userRecipesService.createUserRecipe({
                userRecipe
            });

            res.status(201).json({
                data: createRecipeId,
                message: 'user recipe created'
            })

        } catch (error) {
            next(error);
        }
    });

    //delete
    router.delete('/:userRecipeId', validationHandler({userRecipeId: recipeIdSchema}, 'params'), async function(req, res, next) {
        const {userRecipeId} = req.params;

        try {
            const deletedUserRecipeId = await userRecipesService.deleteUserRecipe({
                userRecipeId
            });

            res.status(200).json({
                data: deletedUserRecipeId,
                message: 'user recipe deleted'
            })
        } catch (error) {
            next(error);
        }
    })
}

module.exports = userRecipesApi;

