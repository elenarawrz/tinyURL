var app = angular.module('TinyURL', []);

var errorFunction = function (err) {
	alert(JSON.stringify(err));
};

app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
	$scope.apiHost = 'http://localhost:8000/';
	$scope.getHost = $scope.apiHost + 'get/';
	$scope.tiny = '';

	$scope.shrink = function () {
		if(!$scope.original) return;

		$http.post($scope.apiHost, { url: $scope.original}).then(
			function (res) {
				$scope.tiny = $scope.getHost + res.data.tinyURL;
			}, errorFunction);
	};

	$scope.redirect = function (url) {
		$http.get($scope.apiHost + 'get/' + url).then(
			function (res) {
				debugger;
			}, errorFunction);
	};

	$scope.showList = function () {
		$http.get($scope.apiHost + 'list').then(
			function (res) {
				$scope.urlList = res.data;
				$('.ui.modal').modal('show');
			}, errorFunction);
	};
}]);