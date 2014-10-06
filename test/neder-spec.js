var expect = require('chai').expect;
var randomstring = require('randomstring').generate;

var Neder = require('../lib/neder');

describe("Neder", function() {
  describe("#amen", function() {
    it("should call the next function with a random number", function(done) {
      var randomNumber = Math.floor(Math.random() * 1000);
      Neder.amen(function(next) {
        next(null, randomNumber);
      }).then(function(data, next) {
        expect(data).to.equal(randomNumber);
        done();
      });
    });

    it("should call the next function with a random string", function(done) {
      var randomString = randomstring();
      Neder.amen(function(next) {
        next(null, randomString);
      }).then(function(data, next) {
        expect(data).to.equal(randomString);
        done();
      });
    });

    it("should call the next function with a deep object", function(done) {
      var randomObject = {
        someString: randomstring(),
        someNumber: Math.random(),
        someOtherObject: {
          someString: randomstring(),
          someNumber: Math.random()
        }
      };

      Neder.amen(function(next) {
        next(null, randomObject);
      }).then(function(data, next) {
        expect(data).to.deep.equal(randomObject);
        done();
      });
    });

    it("should support chaining", function(done) {
      var randomString = randomstring();

      Neder.amen(function(next) {
        next(null, randomString);
      }).then(function(data, next) {
        expect(data).to.equal(randomString);
        randomString = randomstring();
        next(null, randomString);
      }).then(function(data) {
        expect(data).to.equal(randomString);
        done();
      });
    });
  })
});
