var db = require('../providers/mongo-db-provider');
var _ = require('underscore');

var keys = ['name', 'content'];

module.exports = function(app){
  
  //get all reports
  app.get(app.get('endpoint') + '/reports', require('../middleware/authentication')(app), function(request, response){
    db.getAllReports(function(reports, error) {
        if(error) {
            console.log(error);
            response.send(404, error);
        } else {
            response.send(reports);
        }
    });    
  });

//post new report
  app.post(app.get('endpoint') + '/reports', function(request, response) {
    var report = request.body;

    if(verifyReport(report)) {
        db.insertReport(report, function(report, error) {
            if(error) {
                console.log('error here', error);
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
