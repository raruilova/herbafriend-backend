const MongoLib = require('../lib/mongo');

class UserRecipesService {
    constructor() {
        this.collection = 'user-recipes';
        this.mongoDB = new MongoLib();
    }

    async getUserRecipes({userId}) {
        const query = userId && {userId};
        const userRecipes = await this.mongoDB.getAll(this.collection, query);

        return userRecipes || [];
    }

    async createUserRecipe({userRecipe}) {
        const createUserRecipeId = await this.mongoDB.create( this.collection, userRecipe);

        return createUserRecipeId;
    }

    async deleteUserRecipe({userRecipeId}) {
        const deleteUserRecipeId = await this.mongoDB.delete(this.collection, userRecipeId);

        return deleteUserRecipeId;
    }
}

module.exports = UserRecipesService;