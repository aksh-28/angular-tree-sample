angular.module('myApp',['ui.router'])
	.config(function ($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('hostgroup', {
		url: "/hostgroup",
		templateUrl: "views/host_form.html",
		controller: "hostCtrl"
		});
		$urlRouterProvider.otherwise("hostgroup");
		
	})
