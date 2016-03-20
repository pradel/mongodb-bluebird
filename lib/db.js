var Promise = require('bluebird');
var objectAssign = require('object-assign');

var Collection = require('./collection');

var Db = function(db) {
    var self = this;
    if (!db)
        throw new Error('No db argument');
    self._db = db;
    self._collections = {};
};

Db.prototype.close = function() {
    var self = this;
    return new Promise(function(resolve, reject) {
        self._db.close(function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Db.prototype.collection = function(name, options, force) {
    var self = this;
    if (!name)
        throw new Error('No name argument');

    var _options = {
        ObjectId: true
    };

    options = objectAssign(_options, options);

    if (force)
        return new Collection(self._db, name, options);
    if (self._collections[name])
        return self._collections[name];
    self._collections[name] = new Collection(self._db, name, options);
    return self._collections[name];
};

Db.prototype.admin = function() {
    var self = this;
    return self._db.admin();
};

Db.prototype.collectionNames = function(collectionName, options) {
    var self = this;
    return new Promise(function(resolve, reject) {
        options = options || {};
        self._db.collectionNames(collectionName, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Db.prototype.collections = function() {
    var self = this;
    return new Promise(function(resolve, reject) {
        self._db.collections(function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Db.prototype.eval = function(code, parameters, options) {
    var self = this;
    return new Promise(function(resolve, reject) {
        options = options || {};
        self._db.eval(code, parameters, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Db.prototype.logout = function() {
    var self = this;
    return new Promise(function(resolve, reject) {
        self._db.logout(function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Db.prototype.authenticate = function(username, password, options) {
    var self = this;
    return new Promise(function(resolve, reject) {
        options = options || {};
        self._db.authenticate(username, password, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Db.prototype.addUser = function(username, password, options) {
    var self = this;
    return new Promise(function(resolve, reject) {
        options = options || {};
        self._db.addUser(username, password, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Db.prototype.removeUser = function(username, options) {
    var self = this;
    return new Promise(function(resolve, reject) {
        options = options || {};
        self._db.removeUser(username, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Db.prototype.createCollection = function(collectionName, options) {
    var self = this;
    return new Promise(function(resolve, reject) {
        options = options || {};
        self._db.createCollection(collectionName, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Db.prototype.dropCollection = function(collectionName) {
    var self = this;
    return new Promise(function(resolve, reject) {
        self._db.dropCollection(collectionName, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Db.prototype.renameCollection = function(fromCollection, toCollection, options) {
    var self = this;
    return new Promise(function(resolve, reject) {
        options = options || {};
        self._db.renameCollection(fromCollection, toCollection, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Db.prototype.dropDatabase = function() {
    var self = this;
    return new Promise(function(resolve, reject) {
        self._db.dropDatabase(function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Db.prototype.stats = function(options) {
    var self = this;
    return new Promise(function(resolve, reject) {
        options = options || {};
        self._db.stats(options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

module.exports = Db;
