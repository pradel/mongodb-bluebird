var Promise = require('bluebird');
var ObjectID = require('mongodb').ObjectID;
var check = require('check-types');

var Collection = function(db, name, options) {
    var self = this;
    if (!db)
        throw new Error('No db argument');
    if (!name)
        throw new Error('No name argument');
    self._db = db;
    self._name = name;
    self._options = options || {};
    self._collection = self._db.collection(self._name);
    self._objectIds = self._options.ObjectIds || [];
    if (self._options.ObjectId)
        self._objectIds.push('_id');
};

Collection.prototype.find = function(query, fields, options) {
    var self = this;
    query = self.formatQuery(query);
    return new Promise(function(resolve, reject) {
        self._collection.find(query, fields, options).toArray(function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Collection.prototype.findOne = function(query, fields, options) {
    var self = this;
    query = self.formatQuery(query);
    return new Promise(function(resolve, reject) {
        self._collection.findOne(query, fields, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Collection.prototype.findById = function(oid, fields, options) {
    var self = this;
    if (!oid)
        throw new Error('No oid argument');
    return self.findOne({ _id: oid }, fields, options);
};

Collection.prototype.insert = function(docs, options) {
    var self = this;
    docs = self.formatQuery(docs);
    return new Promise(function(resolve, reject) {
        self._collection.insert(docs, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Collection.prototype.update = function(query, document, options) {
    var self = this;
    query = self.formatQuery(query);
    if (document && document._id)
        delete document._id;
    return new Promise(function(resolve, reject) {
        self._collection.update(query, document, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Collection.prototype.updateById = function(oid, document, options) {
    var self = this;
    if (!oid)
        throw new Error('No oid argument');
    return self.update({ _id: oid }, document, options);
};

Collection.prototype.remove = function(query, options) {
    var self = this;
    query = self.formatQuery(query);
    return new Promise(function(resolve, reject) {
        self._collection.remove(query, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Collection.prototype.removeById = function(oid, options) {
    var self = this;
    if (!oid)
        throw new Error('No oid argument');
    return self.remove({ _id: oid }, options);
};

Collection.prototype.count = function(query, options) {
    var self = this;
    query = self.formatQuery(query);
    return new Promise(function(resolve, reject) {
        self._collection.count(query, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Collection.prototype.save = function(doc, options) {
    var self = this;
    doc = self.formatQuery(doc);
    return new Promise(function(resolve, reject) {
        self._collection.save(doc, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Collection.prototype.findAndModify = function(query, sort, doc, options) {
    var self = this;
    query = self.formatQuery(query);
    return new Promise(function(resolve, reject) {
        self._collection.findAndModify(query, sort, doc, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Collection.prototype.findAndRemove = function(query, sort, options) {
    var self = this;
    query = self.formatQuery(query);
    return new Promise(function(resolve, reject) {
        self._collection.findAndRemove(query, sort, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

// http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#group
Collection.prototype.group = function(keys, condition, initial, reduce, finalize, command, options) {
    var self = this;
    return new Promise(function(resolve, reject) {
        self._collection.group(keys, condition, initial, reduce, finalize, command, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

// http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#aggregate
Collection.prototype.aggregate = function(array, options) {
    var self = this;
    return new Promise(function(resolve, reject) {
        self._collection.aggregate(array, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Collection.prototype.drop = function() {
    var self = this;
    return new Promise(function(resolve, reject) {
        self._collection.drop(function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Collection.prototype.rename = function(newName, options) {
    var self = this;
    return new Promise(function(resolve, reject) {
        self._collection.rename(newName, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Collection.prototype.createIndex = function(fieldOrSpec, options) {
    var self = this;
    return new Promise(function(resolve, reject) {
        self._collection.createIndex(fieldOrSpec, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Collection.prototype.ensureIndex = function(fieldOrSpec, options) {
    var self = this;
    return new Promise(function(resolve, reject) {
        self._collection.ensureIndex(fieldOrSpec, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Collection.prototype.dropIndex = function(name) {
    var self = this;
    return new Promise(function(resolve, reject) {
        self._collection.dropIndex(name, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};

Collection.prototype.formatQuery = function(query) {
    var self = this;
    for (var i = 0; i < self._objectIds.length; i++) {
        if (query && query[self._objectIds[i]]) {
            query[self._objectIds[i]] = self.formatQueryType(query[self._objectIds[i]]);
        }
    }
    return query;
};

Collection.prototype.formatQueryType = function(obj) {
    var self = this;
    if (check.string(obj)) {
        return self.formatId(obj);
    } else if (check.array(obj)) {
        return self.formatObjectIds(obj);
    } else if (check.object(obj)) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                obj[key] = self.formatQueryType(obj[key]);
            }
        }
    }
    return obj;
};

Collection.prototype.formatObjectIds = function(objects) {
    var self = this;
    for (var i = 0; i < objects.length; i++) {
        objects[i] = self.formatId(objects[i]);
    }
    return objects;
};

Collection.prototype.formatId = function(hex) {
    var self = this;
    if (hex instanceof ObjectID)
        return hex;
    if (!hex || hex.length !== 24)
        return hex;
    return ObjectID.createFromHexString(hex);
};


module.exports = Collection;
