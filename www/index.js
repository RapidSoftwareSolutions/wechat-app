// Ionic pubnub app

var app = angular.module('rapidchat', ['ionic','login', 'chat', 'channels', 'pubnub.angular.service'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider)
{

  $stateProvider
  .state('chat', {
    url: "/chat/:channel/:nickname",
    templateUrl: "templates/chat.html",
    controller: "chatController"
  })
  .state('channels', {
    url: "/channels/:channel/:nickname",
    templateUrl: "templates/channels.html",
    controller: "channelsController"
  })
  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: "LoginController"
  });
  $urlRouterProvider.otherwise('/login');
})
