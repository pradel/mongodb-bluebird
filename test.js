var mongo = require('./lib');

//find users
mongo.connect("mongodb://localhost:27017/mongodb-bluebird").then(function(db) {
    //get the user collection
    var users = db.collection('users');

    var query = {_id: '507f191e810c19729de860ea',
        foreign_id: '507f191e810c19729de860ea',
        array_id: ["507f191e810c19729de860ea", "507f191e810c19729de860ea"],
        object_id: {
            $in: ["507f191e810c19729de860ea", "507f191e810c19729de860ea"]
        }
    };

    return users.find().then(function(users) {
        console.log(users);
        return db.close();
    });
}).catch(function(err) {
    console.error(err);
});
