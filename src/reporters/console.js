(function() {
  var ConsoleReporter, Reporter, log,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  log = require("loglevel");

  Reporter = require("../reporter");


  /**
   * A Reporter that logs an error message to the console. As simple as possible,
   * but should illustrate the basic idea of what a reporter is all about.
   *
   * @class    ConsoleReporter
   * @extends  Reporter
   */

  module.exports = ConsoleReporter = (function(superClass) {
    extend(ConsoleReporter, superClass);

    function ConsoleReporter(config) {
      this.config = config;
      log.debug("ConsoleReporter.constructor: creating new instance", this.config);
    }

    ConsoleReporter.prototype.notify = function(message, data) {
      return log.error("ConsoleReporter.notify: '" + data.name + "' raised alarm: " + message);
    };

    return ConsoleReporter;

  })(Reporter);

}).call(this);
