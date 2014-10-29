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
            resolver.reject(err);
        resolver.resolve(docs);
    });
    return resolver.promise;
};

Db.prototype.collection = function(name) {
    if (!name)
        throw new Error('No name argument');
    if (this._collections[name])
        return this._collections[name];
    this._collections[name] = new Collection(this._db, name);
    return this._collections[name];
};

module.exports = Db;