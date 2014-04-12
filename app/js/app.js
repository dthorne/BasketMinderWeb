/* Declare app module that has dependency on ngResource */
angular.module('app', ['ngResource']).
  config(['$routeProvider', function($routeProvider) {
    //setup URL routes
    $routeProvider.when('/home', {templateUrl: 'templates/home.html'});
    $routeProvider.when('/about', {templateUrl: 'templates/about.html'});
    $routeProvider.when('/view2', {templateUrl: 'templates/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
