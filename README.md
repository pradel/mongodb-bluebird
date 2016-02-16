# mongodb-bluebird

[![Build Status](https://travis-ci.org/pradel/mongodb-bluebird.svg?branch=master)](https://travis-ci.org/pradel/mongodb-bluebird)

Add promise to the [node-mongodb-native](https://github.com/mongodb/node-mongodb-native).

## Installation

```
npm install mongodb-bluebird
```

## Quick examples

```
var mongo = require('mongodb-bluebird');
//open connection to the database
mongo.connect("mongodb://localhost:27017/mongodb-bluebird").then(function(db) {
    //close connection to the database
    return db.close().then(function() {
        console.log('success');
    });
}).catch(function(err) {
  console.error("something went wrong");
});

//find users
mongo.connect("mongodb://localhost:27017/mongodb-bluebird").then(function(db) {
    //get the user collection
    var users = db.collection('users');
    return users.find().then(function(users) {
        console.log(users);
    }).catch(function(err) {
        console.error("something went wrong");
    });
});

//find one user
users.findOne().then(function(user) {
    console.log(user);
});

//find by id
users.findById('507f191e810c19729de860ea').then(function(user) {
    console.log(user);
});
```

### Get a collection

```
var users = db.collection('users');
```

The `_id` field will be automatically converted into ObjectId.
If you want to convert automatically some other fields into ObjectId just pass an array as second parameter :

```
var users = db.collection('users', {
	ObjectIds: [`your', 'fields']
});
```

If you want to disable ObjectId conversion for `_id:

```
var users = db.collection('users', {
	ObjectId: false
});
```

## API

###Top Level
* `mongodb` - raw mongodb driver

###Collection
[MongoDB Collection](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html)
[MongoDB Queries](http://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html)

* `find([query][, fields][, options])`
* `findOne([query][, fields][, options])`
* `findById(oid[, fields][, options])`
* `insert(docs[, options])`
* `update(query, document[, options])`
* `updateById(oid, document[, options])`
* `remove([query][, options])`
* `removeById(oid[, options])`
* `count([query][, options])`
* `save([doc][, options])`
* `findAndModify(query, sort, doc[, options])`
* `findAndRemove(query, sort[, options])`
* `group(keys, condition, initial, reduce, finalize, command[, options])`
* `aggregate(array[, options])`
* `drop()`
* `rename(newName[, options])`
* `createIndex(fieldOrSpec[, options])`
* `ensureIndex(fieldOrSpec[, options])`
* `dropIndex(name)`

###Db
[MongoDB Db](http://mongodb.github.io/node-mongodb-native/api-generated/db.html)

* `close()`
* `admin()`
* `collectionNames([collectionName][, options])`
* `collections()`
* `eval(code[, parameters][, options])`
* `logout()`
* `authenticate(username, password[, options])`
* `addUser(username, password[, options])`
* `removeUser(username[, options])`
* `createCollection(collectionName[, options])`
* `dropCollection(collectionName)`
* `renameCollection(fromCollection, toCollection[, options])`
* `dropDatabase()`
* `stats([, options])`

##TODO

* Write some tests
