var express = require('express');
var fileSystem = require('fs');
var app = express();

var conf = require('./lib/env').getConf();

app.set('info', {name: "BacketMinderWeb"});
app.set('password', conf.get('password'));
app.set('endpoint', conf.get('endpoint'));

//development environment
app.configure('development', function(){
  //serve the static assets
  app.use(express.static('app'));
});

//production environment
app.configure('production', function(){
  //serve the optimized static assets
  app.use(express.static('build'));
});

//middleware
app.use(express.bodyParser());

//routes
fileSystem.readdirSync(__dirname + '/routes').forEach(function(file) {
    require('./routes/' + file)(app);
});

app.listen(3000);
