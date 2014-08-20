'use strict';

var treasure = require('../models/treasure');

exports.init = function(req, res){
  res.render('treasures/init');
};

exports.index = function(req, res){
  res.render('treasures/index');
};

exports.create = function(req, res){
  res.redirect('/treasures');
};

exports.show = function(req, res){
  res.render('treasures/show');
};
