/* Example controller that uses a service to communicate with a REST web service */
angular.module('app').controller('AdminController', function($scope, User){
  
  //get all users
  var users = User.query(function(){
    $scope.users = users;
  });


  $scope.saveAll = function(){
    $scope.users.forEach(function(user){
      user.$update();
    });
  };

});