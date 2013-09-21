'use strict';

angular.module('MWTutorsApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
      })
      .when('/login', {
        templateUrl: 'views/login.html',
      })
      .when('/newsfeed', {
        templateUrl: 'views/newsfeed.html',
        controller: 'NewsfeedCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
