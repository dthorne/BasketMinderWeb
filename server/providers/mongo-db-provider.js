var db = require("mongojs").connect("basketminderdb", ["reports"]); // "username:password@example.com/mydb"

exports.getAllReports = function(callback) {
    db.reports.find(function(err, reports) {
        if(err) {
            console.log('No Reports');
            console.log(err);
        }
        callback(reports, err);
    });

}

exports.insertReport = function(report, callback) {
    db.reports.insert(report, function(error, report) {
        callback(report, error);
    });
}
