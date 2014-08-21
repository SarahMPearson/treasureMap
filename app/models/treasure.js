'use strict';

var Mongo = require('mongodb'),
    fs    = require('fs'),
    path  = require('path'),
    _     = require('lodash');

function Treasure(o){
  this.tName      = o.tName[0];
  this.photo      = o.photo || [];
  this.loc        = {name:o.loc[0], lat:parseFloat(o.lat[0]), lng:parseFloat(o.lng[0])};
  this.difficulty = o.difficulty[0];
  this.hint       = o.hint[0];
  this.isFound    = false;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.all = function(cb){
  Treasure.collection.find().toArray(cb);
};

Treasure.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:_id}, function(err, object){
    var treasure = changePrototype(object);
    cb(treasure);
  });
};

Treasure.create = function(fields, cb){
  var t = new Treasure(fields);
  Treasure.collection.save(t, cb);
  return(t);
};

Treasure.prototype.uploadPhoto = function(files, cb){
  var dir   = __dirname + '/../static/img/' + this._id,
      ext    = path.extname(files.photo[0].path),
      abs    = dir + '/' + this.tName + ext;
  fs.mkdirSync(dir);

  fs.renameSync(files.photo[0].path, abs);
  this.image = abs;
  Treasure.collection.save(this,cb);
};

Treasure.prototype.toggle = function(){
  this.isFound = true;
};

Treasure.prototype.save = function(cb){
  Treasure.collection.save(this, cb);
  self.photos.push(rel);
};

module.exports = Treasure;

function changePrototype(object){
  return _.create(Treasure.prototype, object);
}

