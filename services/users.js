const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UserService {
    constructor() {
        this.collection = 'users';
        this.mongo = new MongoLib();
    }

    async getUsers({tags}) {
        const query = tags && {tags: {$in: tags}}; //tags dentro de los tags que estoy pasando
        const recepis = await this.mongoDb.getAll(this.collection, query);
        return recepis || [];
    }

    async getUser(email) {
        const [user] = await this.mongo.getAll(this.collection, {email});
        return user;
    }

    async createUser({user}) {
        const {name, email, password} = user;
        const hashedPassword = await bcrypt.hash(password, 10);

        const createUserId = await this.mongo.create(this.collection, {
            name, email, password: hashedPassword
        });

        return createUserId;
    }
}

module.exports = UserService;