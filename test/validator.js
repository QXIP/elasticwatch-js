// Generated by CoffeeScript 1.10.0
(function() {
  var Validator, assert, loglevelMock, mockery, worker;

  mockery = require("mockery");

  assert = require("chai").assert;

  worker = [][0];

  loglevelMock = {
    debug: function(str) {
      return this.strDebug = str;
    },
    error: function(str) {
      return this.strError = str;
    }
  };

  mockery.enable({
    useCleanCache: true
  });

  mockery.registerMock("loglevel", loglevelMock);

  mockery.registerAllowables(["../src/validator"]);

  Validator = require("../src/validator");

  describe("Validator", function() {
    describe("constructor", function() {
      return it("should break if any argument of [fieldName,min,max,tolerance] is missing", function() {
        assert["throw"]((function() {
          return new Validator(null, 10, 20, 5);
        }), Error, "invalid number of options");
        assert["throw"]((function() {
          return new Validator("prop", null, 20, 5);
        }), Error, "invalid number of options");
        assert["throw"]((function() {
          return new Validator("prop", 10, null, 5);
        }), Error, "invalid number of options");
        return assert["throw"]((function() {
          return new Validator("prop", 10, 20, null);
        }), Error, "invalid number of options");
      });
    });
    return describe("validate", function() {
      var validator;
      validator = [][0];
      beforeEach(function() {
        return validator = new Validator("prop", 10, 30, 4);
      });
      it("should return false if no data is supplied", function() {
        return assert.isFalse(validator.validate());
      });
      it("should return false if 5 consecutive values within the result are below the expectation", function() {
        var result;
        result = {
          hits: {
            hits: [
              {
                _source: {
                  prop: 5
                }
              }, {
                _source: {
                  prop: 7
                }
              }, {
                _source: {
                  prop: 6
                }
              }, {
                _source: {
                  prop: 9
                }
              }, {
                _source: {
                  prop: 4
                }
              }
            ]
          }
        };
        return assert.isFalse(validator.validate(result));
      });
      it("should return false if 5 consecutive values within the result are above the expectation", function() {
        var result;
        result = {
          hits: {
            hits: [
              {
                _source: {
                  prop: 35
                }
              }, {
                _source: {
                  prop: 37
                }
              }, {
                _source: {
                  prop: 36
                }
              }, {
                _source: {
                  prop: 39
                }
              }, {
                _source: {
                  prop: 34
                }
              }
            ]
          }
        };
        return assert.isFalse(validator.validate(result));
      });
      it("should return true if less than 5 consecutive values within the result are below the expectation", function() {
        var result;
        result = {
          hits: {
            hits: [
              {
                _source: {
                  prop: 5
                }
              }, {
                _source: {
                  prop: 7
                }
              }, {
                _source: {
                  prop: 6
                }
              }, {
                _source: {
                  prop: 9
                }
              }, {
                _source: {
                  prop: 11
                }
              }
            ]
          }
        };
        return assert.isTrue(validator.validate(result));
      });
      it("should return true if less than 5 consecutive values within the result are above the expectation", function() {
        var result;
        result = {
          hits: {
            hits: [
              {
                _source: {
                  prop: 35
                }
              }, {
                _source: {
                  prop: 37
                }
              }, {
                _source: {
                  prop: 36
                }
              }, {
                _source: {
                  prop: 39
                }
              }, {
                _source: {
                  prop: 29
                }
              }
            ]
          }
        };
        return assert.isTrue(validator.validate(result));
      });
      return it("should return true if all values within the result meet the expectation", function() {
        var result;
        result = {
          hits: {
            hits: [
              {
                _source: {
                  prop: 12
                }
              }, {
                _source: {
                  prop: 17
                }
              }, {
                _source: {
                  prop: 22
                }
              }, {
                _source: {
                  prop: 23
                }
              }, {
                _source: {
                  prop: 27
                }
              }
            ]
          }
        };
        return assert.isTrue(validator.validate(result));
      });
    });
  });

}).call(this);
