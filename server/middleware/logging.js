module.exports = function() {
  return function(request, response, next){
    if(request.headers.password && request.headers.password == 'tankjig') {
        next();
    } else {
        response.send(403, "Access Denied");    
    }
  };
};
