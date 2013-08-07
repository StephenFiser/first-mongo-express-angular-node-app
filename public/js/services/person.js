angular.module('myApp', ['ngResource'])
	.factory('Person', function  ($resource) {
		return $resource('/person');
	});