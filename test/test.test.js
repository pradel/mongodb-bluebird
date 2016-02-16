var should = require('should');
var mongo = require('./../lib');
var config = require('./config');

describe('Index', function() {

    it('should expose mongodb driver', function(done) {
        mongo.mongodb.should.be.instanceof(Object);
        done();
    });

    it('should connect', function(done) {
        mongo.connect(config.url).then(function(db) {
            db.should.be.instanceof(Object);
            done();
        }).catch(function(err) {
            done(err);
        });
    });

});

describe('Db', function() {

    before(function(done) {
        mongo.connect(config.url).then(function(db) {
            this.db = db;
            done();
        }.bind(this)).catch(function(err) {
            done(err);
        });
    });

    it('should force a new collection return', function(done) {
        var collection = this.db.collection('posts');
        collection.should.be.instanceof(Object);
        collection._objectIds.should.be.instanceof(Array).and.have.length(1);
        collection = this.db.collection('posts', {
            ObjectIds: ['name']
        });
        collection.should.be.instanceof(Object);
        collection._objectIds.should.be.instanceof(Array).and.have.length(1);
        collection = this.db.collection('posts', {
            ObjectIds: ['name']
        }, true);
        collection.should.be.instanceof(Object);
        collection._objectIds.should.be.instanceof(Array).and.have.length(2);
        done();
    });

    it('should return a collection with _id as default key', function(done) {
        var collection = this.db.collection('posts');
        collection.should.be.instanceof(Object);
        collection._objectIds.should.be.instanceof(Array).and.have.length(1);
        collection._objectIds.should.containEql('_id');
        done();
    });

    it('should return a collection multiple objectIds', function(done) {
        var collection = this.db.collection('posts', {
            ObjectIds: ['name']
        }, true);
        collection.should.be.instanceof(Object);
        collection._objectIds.should.be.instanceof(Array).and.have.length(2);
        collection._objectIds.should.containEql('_id');
        collection._objectIds.should.containEql('name');
        done();
    });

    it('should remove _id in ObjectIds array', function(done) {
        var collection = this.db.collection('posts', {
            ObjectId: false
        }, true);
        collection.should.be.instanceof(Object);
        collection._objectIds.should.be.instanceof(Array).and.have.length(0);
        done();
    });

    it('should close db', function(done) {
        this.db.close().then(function() {
            done();
        }).catch(function(err) {
            done(err);
        });
    });

});

describe('find', function() {

    before(function(done) {
        mongo.connect(config.url).then(function(db) {
            this.db = db;
            this.collection = db.collection('posts');
            done();
        }.bind(this)).catch(function(err) {
            done(err);
        });
    });


    it('should find an empty array', function(done) {
        this.collection.find().then(function(docs) {
            docs.should.be.instanceof(Array).and.have.length(0);
            done();
        }).catch(function(err) {
            done(err);
        });
    });

    it('should convert string to id object', function(done) {
        var doc = {name: 'name'};
        this.collection.insert(doc).then(function(docs) {
            var _id = docs.ops[0]._id.toString();
            return this.collection.find({_id: _id}).then(function(docs) {
                docs.should.have.length(1);
                done();
            });
        }.bind(this)).catch(function(err) {
            done(err);
        });
    });

    it('should return only selected fields', function(done) {
        var doc = {name: 'name', text: 'text'};
        this.collection.insert(doc).then(function(docs) {
            var _id = docs.ops[0]._id.toString();
            return this.collection.find({_id: _id}, {name: 1}).then(function(docs) {
                should(docs[0]).have.property('name');
                should(docs[0]).not.have.property('text');
                done();
            });
        }.bind(this)).catch(function(err) {
            done(err);
        });
    });

    after(function(done) {
        this.collection.remove().then(function() {
            done();
        }).catch(function(err) {
            done(err);
        });
    });

});