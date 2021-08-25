const {MongoLib, ObjectId} = require('mongodb');
const {config} = require('../config');

const USER = encodeURIComponent(config.db_user);
const PASSWORD = encodeURIComponent(config.db_password);
const DB_NAME = config.db_name;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.db_host}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
    constructor(){
        this.client = new MongoClient(MONGO_URI, {userNewUrlPacer: true});
        this.dbName = DB_NAME;
    }
    //verificando si ya hay una connecion para que no me cree muchas
    connect(){
        if(!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, rejecct) => {
                this.client.connect(err => {
                    if(err) {
                        rejecct(err);
                    }

                    console.log('Connected succesfully to mongo');
                    resolve(this.client.db(this.dbName));
                });
            });
        }

        return MongoLib.connection;
    }

    //actions for CRUD --- collection para que trabaje con mas tablas, mas no solo una

    getAll(collection, query) {
        return this.connect().then(db => {
            return db.collection(collection).find(query).toArray(); //para trabajar con json lo convierto array

        });

    }

    get(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({_id: ObjectId(id)})
        });

    }

    create(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data);
        }).then(result => result.insertedId);

    }

    update(collection, id, data) {
        return this.connect().then(db => {                               //$set actualidaza data la data, upsert da el paso para actualizar por eso true
            return db.collection(collection).updateOne({_id: ObjectId(id)}, {$set: data}, {upsert: true});

        }).then(result => result.upsertedId || id);

    }

    delete(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({_id: ObjectId(id)});
        }).then(()=> id);

    }
}

module.exports = MongoLib;

