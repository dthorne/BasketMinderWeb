angular.module('app').service('AdminService', function(){
	this.getFeedbackList=function(){
		return feedbackList;
	};

	var feedbackList = [
		{name: 'john', email: 'johndoe@fake.com', subject: 'I love basketminder', body: 'It is the best'},
		{name: 'jane', email: 'janedoe@fake.com', subject: 'I hate basketminder', body: 'It is the worst'}
	];
});