'use strict';

var Mongo = require('mongodb'),
    fs    = require('fs'),
    path  = require('path'),
    _     = require('lodash');

function Treasure(o){
  this.tName      = o.tName[0];
  this.photo      = [];
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

Treasure.create = function(fields, files, cb){
  console.log('THIS IS FIELDS', fields);
  console.log('THIS IS FILES', files);
  var t = new Treasure(fields, files);
     // x = Treasure.prototype.uploadPhoto(t.photo);
    //console.log("THIS IS X", x);
  console.log('THIS is T', t);

  Treasure.collection.save(t, cb);
};

Treasure.prototype.uploadPhoto = function(files, cb){
  var dir   = __dirname + '/../static/img/' + this._id,
      exist = fs.existsSync(dir),
      self  = this;

  if(!exist){fs.mkdirSync(dir);}

  files.photos.forEach(function(photo){
    var ext    = path.extname(photo.path),
        rel    = '/img/' + self._id + '/' + self.photos.length + ext,
        abs    = dir + '/' + self.photos.length + ext;
    fs.renameSync(photo.path, abs);
    self.photos.push(rel);
  });
};

module.exports = Treasure;

function changePrototype(object){
  return _.create(Treasure.prototype, object);
}

