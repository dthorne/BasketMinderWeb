module.exports = function(app) {
  return function(request, response, next){
    if(request.headers.password && request.headers.password === app.get('password')) {
        next();
    } else {
        response.send(403, "Access Denied");    
    }
  };
};
