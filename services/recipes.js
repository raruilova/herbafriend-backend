const MongoLib = require('../lib/mongo');


class RecipesService {
    constructor() {
        this.collection = 'recipes';
        this.mongoDb = new MongoLib();
    }
    async getRecipes({tags}) {
        const query = tags && {tags: {$in: tags}}; //tags dentro de los tags que estoy pasando
        const recepis = await this.mongoDb.getAll(this.collection, query);
        return recepis || [];
    }

    async getRecepi({recepiId}) {
        const recepi = await this.mongoDb.get(this.collection, recepiId);
        return recepi || [];
    }

    async createRecepi({recepi}) {
        const createRecepiId = await this.mongoDb.create(this.collection, recepi);
        return createRecepiId;
    }

    async updateRecipe({recepiId, recepi} = {}) {
        const updateRecepiId = await this.mongoDb.update(this.collection, recepiId, recepi);
        return updateRecepiId;
    }

    async deleteRecipe({recepiId}){
        const updateRecepiId = await this.mongoDb.delete(this.collection, recepiId);
        return updateRecepiId;
    }
}

module.exports = RecipesService;
