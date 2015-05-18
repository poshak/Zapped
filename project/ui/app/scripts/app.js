'use strict';

/**
 * @ngdoc overview
 * @name uiApp
 * @description
 * # uiApp
 *
 * Main module of the application.
 */
var app = angular
  .module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
      'pascalprecht.translate'
  ]);
app.config(function ($stateProvider, $urlRouterProvider,$translateProvider) {
//routing
    $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "home/home.html",
        controller : 'HomeCtrl'
      });
  $urlRouterProvider.otherwise("/home");

  //translate
  $translateProvider.translations('en', {
    "PRODUCT_NAME":"Meva Masala",
    "Tagline":"The Secret Ingredient"
  });
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('escaped');
  });
