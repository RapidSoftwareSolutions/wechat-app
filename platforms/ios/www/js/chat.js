"use strict"
var chat = angular.module('chat', []);
chat.controller('chatController', ['$scope', '$state', '$rootScope', '$stateParams', 'PubNub', '$http', '$ionicScrollDelegate', function($scope, $state, $rootScope, $stateParams, PubNub, $http, $ionicScrollDelegate){

  var nickname = $stateParams.nickname;
  var channel = $stateParams.channel;
  $scope.messages = [];

  $scope.goBack = function() {
    $state.go('channels',{nickname: nickname, channel: channel}); 
  }

  PubNub.init({
    publish_key:'pub-c-15eb455a-6726-411a-906f-500ed4ed3efc',
    subscribe_key:'sub-c-6912df4e-5d49-11e5-9c33-02ee2ddab7fe',
  })
  PubNub.ngSubscribe({channel: channel});

  //get pre existing messages
    $http.post('https://wechatherzelia.imrapid.io/messages?channel='+channel, {}) 
  .success(function(data, status, headers, config) {
    $scope.messages = data;
    $ionicScrollDelegate.scrollBottom();
  });
  

  $scope.sendMessage = function(){
    $http.post('https://wechatherzelia.imrapid.io/send', {
      channel: channel,
      message : {
        message : $scope.message,
        nickname : nickname
      }
    });
    $scope.message = '';
  };

  $rootScope.$on(PubNub.ngMsgEv(channel), function(event, payload) {
    $scope.$apply(function() {
      $scope.messages.push(payload.message);
      $ionicScrollDelegate.scrollBottom();
    console.log(payload.message);
    });
    
  });

}]);

chat.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});
