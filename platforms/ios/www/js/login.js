"use strict"
angular.module('login', []).controller('LoginController',['$scope', '$state', '$http', function($scope, $state, $http) {
	$scope.nickname = "";
    //$scope.nickname = (localStorage.getItem('nickname') == 'undefined') ?  "" : localStorage.getItem('nickname');
	$scope.login = function(nickname, channel){
		localStorage.setItem('nickname', $scope.nickname);
		$state.go('channels',{nickname: nickname, channel: channel}); 
	};
}]);
