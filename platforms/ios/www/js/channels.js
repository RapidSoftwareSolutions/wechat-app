"use strict"
angular.module('channels', []).controller('channelsController',['$scope', '$stateParams', '$state', '$http', function($scope, $stateParams, $state, $http) {
  var nickname = $stateParams.nickname;
  $scope.goToChannel = function(channel){
		$state.go('chat', {nickname: nickname, channel: channel}); 
	}
}]);