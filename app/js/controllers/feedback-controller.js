angular.module('app').controller('FeedbackController', function($scope,$http){
  
  //get all users
  /*var users = User.query(function(){
    $scope.users = users;
  });

  $scope.saveAll = function(){
    $scope.users.forEach(function(user){
      user.$update();
    });
  };*/

  $scope.addComment = function(){
  	var name = $scope.yourName;
  	var email = $scope.yourEmail;
  	var comment = $scope.yourComment;
  	console.log(name + " " + email + " " + comment);
  	
  	var data = {
  		name: name,
  		email:email,
  		content:comment,
  		date:new Date()
  	}
  	$http({method: 'POST', url: '/WS/reports', data:data}).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  };


});
