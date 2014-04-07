var db = require('../providers/mongo-db-provider');
var _ = require('underscore');

var keys = ['name', 'content'];

module.exports = function(app){
  
  //get all reports
  app.get(app.get('endpoint') + '/reports', function(request, response){
    db.getAllReports(function(reports, error) {
        if(error) {
            console.log(error);
            response.send(404, error);
        } else {
            response.send(reports);
        }
    });    
  });

//get all reports
  app.post(app.get('endpoint') + '/reports', function(request, response) {
    var report = request.body;

    if(verifyReport(report)) {
        //report = _.pick(report, keys);
        db.insertReport(report, function(report, error) {
            if(error) {
                console.log('error', error);
                response.send(404, error);
            } else {
                response.send(report);
            }
        });    
    } else {
        response.send(400, "Response was not properly validated");
    }
  });

    function verifyReport(report) {
        var valid = true;
        _.forEach(keys, function(key) {
            valid = _(report).has(key);
        });
        return valid;
    }

};
