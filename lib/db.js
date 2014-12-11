var Promise = require('bluebird');

var Collection = require('./collection');

var Db = function(db) {
    if (!db)
        throw new Error('No db argument');
    this._db = db;
    this._collections = {};
};

Db.prototype.close = function () {
    var resolver = Promise.defer();
    this._db.close(function(err, docs) {
        if (err)
            return resolver.reject(err);
        return resolver.resolve(docs);
    });
    return resolver.promise;
};

Db.prototype.collection = function(name, options, force) {
    if (!name)
        throw new Error('No name argument');
    if (force)
        return new Collection(this._db, name, options);
    if (this._collections[name])
        return this._collections[name];
    this._collections[name] = new Collection(this._db, name, options);
    return this._collections[name];
};

Db.prototype.admin = function () {
    return this._db.admin();
};

Db.prototype.collectionNames = function (collectionName, options) {
    var resolver = Promise.defer();
    this._db.collectionNames(collectionName, options, function(err, docs) {
        if (err)
            return resolver.reject(err);
        return resolver.resolve(docs);
    });
    return resolver.promise;
};

Db.prototype.collections = function () {
    var resolver = Promise.defer();
    this._db.collections(function(err, docs) {
        if (err)
            return resolver.reject(err);
        return resolver.resolve(docs);
    });
    return resolver.promise;
};

Db.prototype.eval = function (code, parameters, options) {
    var resolver = Promise.defer();
    this._db.eval(code, parameters, options,function(err, docs) {
        if (err)
            return resolver.reject(err);
        return resolver.resolve(docs);
    });
    return resolver.promise;
};

Db.prototype.logout = function () {
    var resolver = Promise.defer();
    this._db.logout(function(err, docs) {
        if (err)
            return resolver.reject(err);
        return resolver.resolve(docs);
    });
    return resolver.promise;
};

Db.prototype.authenticate = function (username, password, options) {
    var resolver = Promise.defer();
    this._db.authenticate(username, password, options, function(err, docs) {
        if (err)
            return resolver.reject(err);
        return resolver.resolve(docs);
    });
    return resolver.promise;
};

Db.prototype.addUser = function (username, password, options) {
    var resolver = Promise.defer();
    this._db.addUser(username, password, options, function(err, docs) {
        if (err)
            return resolver.reject(err);
        return resolver.resolve(docs);
    });
    return resolver.promise;
};

Db.prototype.removeUser = function (username, options) {
    var resolver = Promise.defer();
    this._db.removeUser(username, options, function(err, docs) {
        if (err)
            return resolver.reject(err);
        return resolver.resolve(docs);
    });
    return resolver.promise;
};

Db.prototype.createCollection = function (collectionName, options) {
    var resolver = Promise.defer();
    this._db.createCollection(collectionName, options, function(err, docs) {
        if (err)
            return resolver.reject(err);
        return resolver.resolve(docs);
    });
    return resolver.promise;
};

Db.prototype.dropCollection = function (collectionName) {
    var resolver = Promise.defer();
    this._db.dropCollection(collectionName, function(err, docs) {
        if (err)
            return resolver.reject(err);
        return resolver.resolve(docs);
    });
    return resolver.promise;
};

Db.prototype.renameCollection = function (fromCollection, toCollection, options) {
    var resolver = Promise.defer();
    this._db.renameCollection(fromCollection, toCollection, options, function(err, docs) {
        if (err)
            return resolver.reject(err);
        return resolver.resolve(docs);
    });
    return resolver.promise;
};

Db.prototype.dropDatabase = function () {
    var resolver = Promise.defer();
    this._db.dropDatabase(function(err, docs) {
        if (err)
            return resolver.reject(err);
        return resolver.resolve(docs);
    });
    return resolver.promise;
};

Db.prototype.stats = function (options) {
    var resolver = Promise.defer();
    this._db.stats(options, function(err, docs) {
        if (err)
            return resolver.reject(err);
        return resolver.resolve(docs);
    });
    return resolver.promise;
};

module.exports = Db;
