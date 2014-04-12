/* Declare app module that has dependency on ngResource */
angular.module('app', ['ngResource']).
  config(['$routeProvider', function($routeProvider) {
    //setup URL routes
    $routeProvider.when('/home', {templateUrl: 'templates/home.html'});
    $routeProvider.when('/about', {templateUrl: 'templates/about.html'});
    $routeProvider.when('/feedback', {templateUrl: 'templates/feedback.html'});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);
