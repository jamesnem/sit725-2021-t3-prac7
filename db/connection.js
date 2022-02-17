const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://practicals:3aRW0bxz4vMb31Mj@cluster0.1qyzs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;

module.exports = {
    connectToDB: function (callback) {
        client.connect(function (err, db ) {
            if (err || !db) {
                return callback(err);
            }

            dbConnection = db.db("pracitcals");
            console.log("Connected to mongo atlas");

            return callback();
        });
    },

    getDb: function () {
        return dbConnection;
    }
}