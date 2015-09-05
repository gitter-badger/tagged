// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('tagged', ['ionic', 'ngCordova', 'auth0', 'angular-storage', 'angular-jwt'])
.constant('appName', "tagged")
.run(function($ionicPlatform, auth) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    auth.hookEvents();
  });
})

.config(function($stateProvider, $urlRouterProvider,  authProvider, $httpProvider, jwtInterceptorProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'app/menu/menu.html',
    controller: 'menuController as menu'
  })

  .state('app.account', {
    url: '/account',
    views: {
      'menuContent': {
        templateUrl: 'app/account/account.html',
        controller: 'accountController as account'
      }
    }
  })

  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'app/home/home.html',
          controller: 'homeController as home'
        }
      }
    })
    .state('app.messages', {
      url: '/messages',
      views: {
        'menuContent': {
          templateUrl: 'app/message-list/message-list.html',
          controller: 'messageListController as messageList'
        }
      }
    })
    .state('app.messages.compose', {
      url: '/compose/{to}',
      views:{
        'menuContent@app': {
          templateUrl: 'app/compose-message/compose-message.html',
          controller: 'composeMessageController as composer'
        }
      }
    })
    .state('app.messages.thread', {
      url: '/thread/{threadId}',
      views: {
        'menuContent@app': {
          templateUrl: 'app/messages/messages.html',
          controller: 'messagesController as messages'
        }
      }
    })

  .state('app.browseoffers', {
    url: '/offers',
    views: {
      'menuContent': {
        templateUrl: 'app/browse/offers/offers.html',
        controller: 'browseController as browse'
      }
    }
  });

  authProvider.init({
    domain: 'tagged.eu.auth0.com',
    clientID: 'wsBesRrta5xAHI8kD2SUQdzUizCMPzZZ',
    loginState: 'login'
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise(function(){
    console.log("route not found");
    return '/app/home';
  });
});
