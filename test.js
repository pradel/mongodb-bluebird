var mongo = require('./lib');

//find users
mongo.connect("mongodb://localhost:27017/mongodb-bluebird").then(function(db) {
    //get the user collection
    var users = db.collection('users');
    return db.close();
}).catch(function(err) {
    console.error(err);
});