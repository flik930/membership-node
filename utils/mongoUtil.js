const { MongoClient } = require("mongodb");
const uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;
// const client = new MongoClient(uri);

var _db;

module.exports = {
  connect: function() {
    MongoClient.connect(uri, function(err, client) {
      if (err) {
        console.log('err', err)
      } else {
        _db = client.db(process.env.MONGODB_DATABASE);
      }
    })
  },

  getDB: function() {
    return _db;
  }
};