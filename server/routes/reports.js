var db = require('../providers/mongo-db-provider');

module.exports = function(app){
  
  //get all reports
  app.get('/reports', function(request, response){
    console.log('get reports');
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
    //console.log('post ', request);
    var report = request.body;
    console.log(report);
    db.insertReport(report, function(report, error) {
        if(error) {
            console.log('error', error);
            response.send(404, error);
        } else {
            response.send(report);
        }
    });    

  });
};
