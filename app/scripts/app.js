'use strict';

angular.module('MWTutorsApp', ['ngRoute', 'ngSanitize'])
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
      .when('/about-us', {
        templateUrl: 'views/aboutUs.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
