const express = require('express');
const RecipesService = require('../services/recipes');
const validationHandler = require('../utils/middleware/validationHandler');

// importacion de la validacion de los datos
const {recipeIdSchema, createRecipeSchema, updateRecipeSchema } = require('../utils/schemas/recipes');

function recipesApi(app) {
    const router = express.Router();
    app.use('/api/recipes', router);//a partir de esta ruta se crean las demas

    //service

    const recipesService = new RecipesService();

    router.get('/', async function(req, res, next) {
        const {tags} = req.query;
        try {
            const recepies = await recipesService.getRecipes({tags});
            //throw new Error('Error getting recipes') -- me trae el stack en dev mas no en production

            res.status(200).json({
                data: recepies,
                message: 'Recipes listed'
            })
        } catch (error) {
            next(error);
        }
    });
                                                                        //saco de los paramatros ese id
    router.get('/:recepiId', validationHandler({recepiId: recipeIdSchema}, 'params'), async function(req, res, next) {
        const {recepiId} = req.params
        try {
            const recepiesId = await recipesService.getRecepi({recepiId});

            res.status(200).json({
                data: recepiesId,
                message: 'Recipes listed'
            })
        } catch (error) {
            next(error);
        }
    });
    //create
    router.post('/',validationHandler(createRecipeSchema), async function(req, res, next) {
        
        const {body:recepi} = req;
        try {
            const createRecepiId = await recipesService.createRecepi({recepi});

            res.status(201).json({
                data: createRecepiId,
                message: 'Recipes created'
            })
        } catch (error) {
            next(error);
        }
    });
    //update
    router.put('/:recepiId', validationHandler({recepiId: recipeIdSchema}, 'params') ,validationHandler(updateRecipeSchema),async function(req, res, next) {
        const {recepiId} = req.params
        const {body:recepi} = req;
        try {
            const updateRecepiId = await recipesService.updateRecipe({recepiId, recepi});

            res.status(200).json({
                data: updateRecepiId,
                message: 'Recipes updated'
            })
        } catch (error) {
            next(error);
        }
    });
    //delete
    router.delete('/:recepiId',validationHandler({recepiId: recipeIdSchema}, 'params'), async function(req, res, next) {
        const {recepiId} = req.params
        try {
            const deleteRecepies = await await recipesService.deleteRecipe({recepiId});

            res.status(200).json({
                data: deleteRecepies,
                message: 'Recipes deleted'
            })
        } catch (error) {
            next(error);
        }
    });
}

module.exports = recipesApi;