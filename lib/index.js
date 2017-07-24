var mongodb = require('mongodb');
var Promise = require('bluebird');

var MongoClient = mongodb.MongoClient;

var Collection = require('./collection');
var Db = require('./db');

var app = function() {
    this._db = null;
    this._collections = {};
};

app.prototype.connect = function(url, settings) {
    if (!settings) {
        settings = {};
    }
    if (!url)
        throw new Error('No url argument');
    var self = this;
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, settings, function(err, db) {
            if (err)
                return reject(err);
            self._db = new Db(db);
            return resolve(self._db);
        });
    });
};

//Expose raw driver
app.prototype.mongodb = mongodb;

module.exports = new app();
