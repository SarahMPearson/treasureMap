'use strict';

var Treasure = require('../models/treasure'),
    mp       = require('multiparty');


exports.init = function(req, res){
  res.render('treasures/init');
};

exports.index = function(req, res){
  Treasure.all(function(err, treasure){
    res.render('treasures/index', {treasures:treasure});
  });
};

exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    Treasure.create(fields, files, function(){
      res.redirect('/treasures');
    });
  });
};

exports.show = function(req, res){
  res.render('treasures/show');
};
