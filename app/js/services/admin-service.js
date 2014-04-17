angular.module('app').service('AdminService', function($http){
	this.getFeedbackList=function(callback){		
		$http({method: 'GET', url: '/WS/reports', headers:{password:"tempPassword"} }).
		    success(function(data, status, headers, config) {
		      // this callback will be called asynchronously
		      // when the response is available
		 	callback(data); 
		    }).
		    error(function(data, status, headers, config) {
		      // called asynchronously if an error occurs
		      // or server returns response with an error status.
			callback(data);
		    });
	};

	this.submitPassword=function(callback, password){
		console.log(password);
		$http({method: 'GET', url: '/WS/reports', headers:{password:password} }).
		    success(function(data, status, headers, config) {
		      // this callback will be called asynchronously
		      // when the response is available
		 	callback(data); 
		    }).
		    error(function(data, status, headers, config) {
		      // called asynchronously if an error occurs
		      // or server returns response with an error status.
			callback(data);
		    });
	};
	
	/*var feedbackList = [
		{name: 'john', email: 'johndoe@fake.com', subject: 'I love basketminder', body: 'It is the best'},
		{name: 'jane', email: 'janedoe@fake.com', subject: 'I hate basketminder', body: 'It is the worst'}
	];*/
});
