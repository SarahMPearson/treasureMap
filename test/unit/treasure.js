/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure    = require('../../app/models/treasure'),
    dbConnect = require('../../app/lib/mongodb'),
    Mongo     = require('mongodb'),
    cp        = require('child_process'),
    db        = 'template-test';

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Treasure object', function(){
      var o = {tName: 'gold', photo: '/img/gold.jpg', loc:{name:'Green Bay', lat: '41.56', lng: '-75.87'}, difficulty: 'hard', hint: 'go to pawn shop'},
          t = new Treasure(o);
      expect(t).to.be.instanceof(Treasure);
      expect(t.tName).to.equal('gold');
      expect(t.photo).to.equal('/img/gold.jpg');
      expect(t.loc.name).to.equal('Green Bay');
      expect(t.loc.lat).to.equal(41.56);
      expect(t.loc.lng).to.equal(-75.87);
      expect(t.difficulty).to.equal('hard');
      expect(t.hint).to.equal('go to pawn shop');
    });
  });

  describe('.all', function(){
    it('should get all people', function(done){
      Treasure.all(function(err, treasures){
        expect(treasures).to.have.length(2);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find one treasure by its id', function(done){
      Treasure.findById('000000000000000000000001', function(treasure){
        expect(treasure).to.be.instanceof(Treasure);
        expect(treasure.tName).to.equal('gold');
        done();
      });
    });
  });

  describe('.create', function(){
    it('should create a new treasure', function(done){
      var o = {tName: 'gold', photo: '/img/gold.jpg', loc:{name:' Green Bay', lat: '41.56', lng: '-75.87'}, difficulty: 'hard', hint: 'go to pawn shop'};
      Treasure.create(o, function(err, treasure){
        expect(treasure._id).to.be.instanceof(Mongo.ObjectID);
        expect(treasure.tName).to.equal('gold');
        done();
      });
    });
  });
});//last bracket

