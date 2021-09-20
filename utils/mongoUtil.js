const { MongoClient } = require("mongodb");
const uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;

var _db;

module.exports = {
  getDB: function() {
    return new Promise(async (resolve, reject) => {
      if (!_db) {
        try {
          const client = new MongoClient(uri);
          await client.connect();
          _db = client.db(process.env.MONGODB_DATABASE);
          resolve(_db)
        } catch (err) {
          reject(err);
        }
      } else {
        resolve(_db)
      }
    })
  }
};