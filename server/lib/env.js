var nconf = require('nconf');

var DEFAULT_ENV = 'local';

module.exports.getConf = function() {
    nconf.argv().env().file({
        file: __dirname + '/../env/' + this.getEnvCode() + '.json'
    });

    return nconf;
};

module.exports.getEnvCode = function() {
    var env = process.env.NODE_ENV;
    return env ? env : DEFAULT_ENV;
};