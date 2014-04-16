/* Example controller that uses a service to communicate with a REST web service */
angular.module('app').controller('AdminController', function($scope, AdminService){
  
  $scope.feedbackList = [];

  init();

  function init() {
    $scope.feedbackList = AdminService.getFeedbackList();
  }

});