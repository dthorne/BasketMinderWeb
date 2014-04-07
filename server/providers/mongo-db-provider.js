var db = require("mongojs").connect("basketminderdb", ["reports"]); // "username:password@example.com/mydb"

exports.getAllReports = function(callback) {
    db.reports.find(function(err, reports) {
        console.log(err);
        if(err) {
            console.log('No Reports');
            console.log(err);
        } else {
            console.log('Reports:');
            console.log(reports);
        }
        callback(err, reports);
    });

}

exports.insertReport = function(report, callback) {
    db.reports.insert(report, function(err, A) {
        console.log(err);
        console.log(A);
        callback();
    }

}
