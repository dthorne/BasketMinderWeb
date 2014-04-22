angular.module('app').service('AdminService', function($http){


	this.submitPassword=function(callback, password){
		$http({method: 'GET', url: 'ws/reports', headers:{password:password} }).
		    success(function(data, status, headers, config) {
		      // this callback will be called asynchronously
		      // when the response is available
		 	callback(data); 
		    }).
		    error(function(data, status, headers, config) {
		      // called asynchronously if an error occurs
		      // or server returns response with an error status.
			alert("Invalid Password!");
		    });
	};
	
	/*var feedbackList = [
		{name: 'john', email: 'johndoe@fake.com', subject: 'I love basketminder', body: 'It is the best'},
		{name: 'jane', email: 'janedoe@fake.com', subject: 'I hate basketminder', body: 'It is the worst'}
	];*/
});
