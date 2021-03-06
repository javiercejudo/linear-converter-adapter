/*jshint node:true, mocha:true */

'use strict';

require('should');

var decimalFactory = require('linear-arbitrary-precision');
var adapter = require('../src/linear-converter-adapter');

describe('linear arbitrary precision with linear-converter', function() {
  var Decimal = decimalFactory(adapter);

  describe('precision', function() {
    var initialPrecision = Decimal.getPrecision();

    it('should be able to get the current precision', function() {
      Decimal.getPrecision().should.have.type('number');
    });

    it('should be able to set the current precision', function() {
      Decimal.setPrecision(42);
      Decimal.getPrecision().should.be.exactly(42);
      Decimal.setPrecision(initialPrecision);
    });
  });

  describe('operations', function() {
    it('should have a plus method', function() {
      new Decimal('0.1').plus(new Decimal('0.2')).valueOf().should.be.exactly(0.1 + 0.2);
    });

    it('should have a minus method', function() {
      new Decimal('0.3').minus(new Decimal('0.1')).valueOf().should.be.exactly(0.3 - 0.1);
    });

    it('should have a times method', function() {
      new Decimal('0.6').times(new Decimal('3')).valueOf().should.be.exactly(0.6 * 3);
    });

    it('should have a div method', function() {
      new Decimal('0.3').div(new Decimal('0.2')).valueOf().should.be.exactly(0.3 / 0.2);
    });
  });

  describe('toString, valueOf and JSON', function() {
    it('should be able to return a string representation', function() {
      var decimalOne = new Decimal('1');

      decimalOne.toString().should.be.exactly('1')
        .and.exactly(decimalOne.toJSON());

      decimalOne.valueOf().should.be.exactly(1);
    });

    it('should play nicely with Number()', function() {
      var decimalOne = new Decimal('1');

      Number(decimalOne).should.be.exactly(1);
    });

    it('should play nicely with JSON.stringify()', function() {
      var decimalOne = new Decimal('1');
      var stringified = JSON.stringify([decimalOne]);

      stringified.should.be.exactly('["1"]');

      JSON.parse(stringified, Decimal.JSONReviver)[0].should.eql(decimalOne);
    });
  });
});
