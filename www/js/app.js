// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ARVeo.controllers','ARVeo.services','ARVeo.animations'])

.run(function($ionicPlatform, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    analytics.startTrackerWithId('UA-55099400-1');
    $state.go('app');
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('app', {
    url: '/',
    templateUrl: 'templates/app.html',
    controller: 'AppCtrl'
  })
})