'use strict';

var Treasure = require('../models/treasure');

exports.init = function(req, res){
  res.render('treasures/init');
};

exports.index = function(req, res){
  Treasure.all(function(err, treasure){
    res.render('treasures/index', {treasures:treasure});
  });
};

exports.create = function(req, res){
  Treasure.create(treasure, function(){
    res.redirect('/treasures');

  });
};

exports.show = function(req, res){
  res.render('treasures/show');
};
