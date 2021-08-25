const joi = require('@hapi/joi');

const recipeIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const recipeNameSchema = joi.string().max(80);
const recipeIngredientsSchema = joi.string().max(300);
const recipePreparationSchema = joi.string().max(300);
const recipeImageSchema = joi.string().uri();
const recipeCategorySchema = joi.string().max(80);

const createRecipeSchema = {
    name: recipeNameSchema.required(),
    ingredients: recipeIngredientsSchema.required(),
    preparation: recipePreparationSchema.required(),
    image: recipeImageSchema.required(),
    category: recipeCategorySchema.required()
}

const updateRecipeSchema = {
    name: recipeNameSchema,
    ingredients: recipeIngredientsSchema,
    preparation: recipePreparationSchema,
    image: recipeImageSchema,
    category: recipeCategorySchema
}

module.exports = {
    recipeIdSchema,
    createRecipeSchema,
    updateRecipeSchema
}