/*jshint node:true */

'use strict';

var lc = require('linear-converter');

module.exports = {
  getInstance: getInstance,
  getPrecision: getPrecision,
  setPrecision: setPrecision,
  plus: plus,
  minus: minus,
  times: times,
  div: div,
  toString: toString,
  valueOf: valueOf,
  parseInput: Number
};

// not necessarily true nor enforceable
var precision = 17;

function LC(x) {
  this.val = function() {
    return x;
  };
}

function getPrecision() {
  return precision;
}

function setPrecision(LC, n) {
  precision = n;
}

function plus(xLC, yLC) {
  var y = yLC.val();

  return new LC(lc.convert(xLC.val(), [[0, 1], [y, 1 + y]]));
}

function minus(xLC, yLC) {
  var y = yLC.val();

  return new LC(lc.convert(xLC.val(), [[y, 1 + y], [0, 1]]));
}

function times(xLC, yLC) {
  return new LC(lc.convert(xLC.val(), [[0, 1], [0, yLC.val()]]));
}

function div(xLC, yLC) {
  return new LC(lc.convert(xLC.val(), [[0, yLC.val()], [0, 1]]));
}

function toString(x) {
  return x.val().toString();
}

function valueOf(x) {
  return x.val().valueOf();
}

function getInstance() {
  return LC;
}
