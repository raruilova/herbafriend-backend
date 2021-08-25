const { recipesMock } = require('../utils/mocks/recipes');


class RecipesService {
    async getRecipes() {
        const recepis = await Promise.resolve(recipesMock);
        return recepis || [];
    }

    async getRecepi() {
        const recepi = await Promise.resolve(recipesMock);
        return recepi;
    }

    async createRecepi() {
        const createRecepiId = await Promise.resolve(recipesMock);
        return createRecepiId;
    }

    async updateRecipe() {
        const updateRecepiId = await Promise.resolve(recipesMock);
        return updateRecepiId;
    }

    async deleteRecipe(){
        const updateRecepiId = await Promise.resolve(recipesMock);
        return updateRecepiId;
    }
}

module.exports = RecipesService;
