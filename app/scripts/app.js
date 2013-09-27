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
      .when('/contact-us', {
        templateUrl: 'views/contactUs.html',
      })
      .when('/newsfeed', {
        templateUrl: 'views/newsfeed.html',
        controller: 'NewsfeedCtrl'
      })
      .when('/about-us', {
        templateUrl: 'views/aboutUsPage.html',
      })
      .when('/contact-us', {
        templateUrl: 'views/contactUsPage.html',
      })
      .when('/calendar', {
        templateUrl: 'views/calendarPage.html',
      })
      .when('/newsfeed-cms', {
        templateUrl: 'views/newsfeedCms.html',
        controller: 'NewsfeedCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
