var db = require('../providers/mongo-db-provider');

var keys = ['name', 'content'];

module.exports = function(app){
  
  //get all reports
  app.get('/reports', function(request, response){
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
  app.post('/reports', function(request, response) {
    var report = request.body;
    verfiyReport(report);
    report = _.pick(report, keys);
    db.insertReport(report, function(report, error) {
        if(error) {
            console.log('error', error);
            response.send(404, error);
        } else {
            response.send(report);
        }
    });    

  });

    function verifyReport(report) {
        var valid = true;
        _.forEach(keys, function(key) {
            valid = report.has(key);
        });
        return valid;
    }

};
