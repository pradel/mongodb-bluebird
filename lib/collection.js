var Promise = require('bluebird');
var ObjectID = require('mongodb').ObjectID;

var Collection = function(db, name) {
    if (!db)
        throw new Error('No db argument');
    if (!name)
        throw new Error('No name argument');
    this._db = db;
    this._name = name;
    this._collection = this._db.collection(this._name);
};

Collection.prototype.find = function (query, fields, options) {
    if (query && query._id)
        query._id =  this.formatId(query._id);
    var resolver = Promise.defer();
    this._collection.find(query, fields, options).toArray(function(err, docs) {
        if (err)
            resolver.reject(err);
        resolver.resolve(docs);
    });
    return resolver.promise;
};

Collection.prototype.findOne = function (query, fields, options) {
    if (query && query._id)
        query._id =  this.formatId(query._id);
    var resolver = Promise.defer();
    this._collection.findOne(query, fields, options, function(err, docs) {
        if (err)
            resolver.reject(err);
        resolver.resolve(docs);
    });
    return resolver.promise;
};

Collection.prototype.findById = function (oid, fields, options) {
    if (!oid)
        throw new Error('No oid argument');
    return this.findOne({_id: oid}, fields, options);
};

Collection.prototype.insert = function (docs, options) {
    var resolver = Promise.defer();
    this._collection.insert(docs, options, function(err, docs) {
        if (err)
            resolver.reject(err);
        resolver.resolve(docs);
    });
    return resolver.promise;
};

Collection.prototype.update = function (query, document, options) {
    if (query && query._id)
        query._id =  this.formatId(query._id);
    if (document && document._id)
        delete document._id;
    var resolver = Promise.defer();
    this._collection.update(query, document, options, function(err, docs) {
        if (err)
            resolver.reject(err);
        resolver.resolve(docs);
    });
    return resolver.promise;
};

Collection.prototype.updateById = function (oid, document, options) {
    if (!oid)
        throw new Error('No oid argument');
    return this.update({_id: oid}, document, options);
};

Collection.prototype.remove = function (query, options) {
    if (query && query._id)
        query._id =  this.formatId(query._id);
    var resolver = Promise.defer();
    this._collection.remove(query, options, function(err, docs) {
        if (err)
            resolver.reject(err);
        resolver.resolve(docs);
    });
    return resolver.promise;
};

Collection.prototype.removeById = function (oid, options) {
    if (!oid)
        throw new Error('No oid argument');
    return this.remove({_id: oid}, options);
};

Collection.prototype.count = function (query, options) {
    if (query && query._id)
        query._id =  this.formatId(query._id);
    var resolver = Promise.defer();
    this._collection.count(query, options, function(err, docs) {
        if (err)
            resolver.reject(err);
        resolver.resolve(docs);
    });
    return resolver.promise;
};

Collection.prototype.save = function (doc, options) {
    var resolver = Promise.defer();
    this._collection.save(doc, options, function(err, docs) {
        if (err)
            resolver.reject(err);
        resolver.resolve(docs);
    });
    return resolver.promise;
};

Collection.prototype.findAndModify = function (query, sort, doc, options) {
    if (query && query._id)
        query._id =  this.formatId(query._id);
    var resolver = Promise.defer();
    this._collection.findAndModify(query, sort, doc, options, function(err, docs) {
        if (err)
            resolver.reject(err);
        resolver.resolve(docs);
    });
    return resolver.promise;
};

Collection.prototype.findAndRemove = function (query, sort, options) {
    if (query && query._id)
        query._id =  this.formatId(query && query._id);
    var resolver = Promise.defer();
    this._collection.findAndRemove(query, sort, options, function(err, docs) {
        if (err)
            resolver.reject(err);
        resolver.resolve(docs);
    });
    return resolver.promise;
};

Collection.prototype.drop = function () {
    var resolver = Promise.defer();
    this._collection.drop(function(err, docs) {
        if (err)
            resolver.reject(err);
        resolver.resolve(docs);
    });
    return resolver.promise;
};

Collection.prototype.rename = function (newName, options) {
    var resolver = Promise.defer();
    this._collection.rename(newName, options, function(err, docs) {
        if (err)
            resolver.reject(err);
        resolver.resolve(docs);
    });
    return resolver.promise;
};

Collection.prototype.createIndex = function (fieldOrSpec, options) {
    var resolver = Promise.defer();
    this._collection.createIndex(fieldOrSpec, options, function(err, docs) {
        if (err)
            resolver.reject(err);
        resolver.resolve(docs);
    });
    return resolver.promise;
};

Collection.prototype.ensureIndex = function (fieldOrSpec, options) {
    var resolver = Promise.defer();
    this._collection.ensureIndex(fieldOrSpec, options, function(err, docs) {
        if (err)
            resolver.reject(err);
        resolver.resolve(docs);
    });
    return resolver.promise;
};

Collection.prototype.dropIndex = function (name) {
    var resolver = Promise.defer();
    this._collection.dropIndex(name, function(err, docs) {
        if (err)
            resolver.reject(err);
        resolver.resolve(docs);
    });
    return resolver.promise;
};

Collection.prototype.formatId = function(hex) {
    if (hex instanceof ObjectID)
        return hex;
    if (!hex || hex.length !== 24)
        return hex;
    return ObjectID.createFromHexString(hex);
};


module.exports = Collection;