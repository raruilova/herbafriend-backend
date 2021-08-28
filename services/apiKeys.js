// antes de implementar sigin
// para firmar el token y obtener los scopes requeridos
const MongoLib = require('../lib/mongo');

class ApiKeysService {
    constructor() {
        this.collection = 'api-keys';
        this.mongoBD = new MongoLib();
    }

    async getApiKey({token}) {
        const [apiKey] = await this.mongoBD.getAll(this.collection, {token});
        return apiKey;
    }
}

module.exports = ApiKeysService;