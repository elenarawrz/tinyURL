var app = angular.module('TinyURL', []);

var errorFunction = function (err) {
	alert(err);
};

app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
	$scope.apiHost = 'http://localhost:8000/';
	$scope.tiny = '';

	$scope.shrink = function () {
		if(!$scope.original) return;

		$http.post($scope.apiHost, { url: $scope.original}).then(
			function (res) {
				$scope.tiny = $scope.apiHost + 'u/' + res.data.tinyURL;
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