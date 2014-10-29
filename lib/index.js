var mongodb = require('mongodb');
var Promise = require('bluebird');

var MongoClient = mongodb.MongoClient;

var Collection = require('./collection');
var Db = require('./Db');

var app = function() {
    this._db = null;
    this._collections = {};
};

app.prototype.connect = function(url) {
    if (!url)
        throw new Error('No url argument');
    var self = this;
    var resolver = Promise.defer();
    MongoClient.connect(url, function(err, db) {
        if (err)
            resolver.reject(err);
        self._db = new Db(db);
        resolver.resolve(self._db);
    });
    return resolver.promise;
};

module.exports = new app();