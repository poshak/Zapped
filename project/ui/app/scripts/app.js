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
        url: '/home',
        templateUrl: 'home/home.html',
        controller : 'HomeCtrl'
      });

  $stateProvider
    .state('list', {
      url: '/list?type',
      templateUrl: 'ListOfItems/list.html',
      controller: 'ListController'
    });
  $stateProvider
    .state('item', {
      url: '/item/:name',
      templateUrl: 'item/item.html',
      controller: 'ItemCtrl'
    });
    //.state('list.spices', {
    //  url: '/spices',
    //  templateUrl: 'ListOfItems/spices.html'
    //})
    //.state('list.dryfruits', {
    //  url: '/dryfruits',
    //  templateUrl: 'ListOfItems/dryfruits.html'
    //});

  $stateProvider
    .state('about', {
      url: '/about',
      templateUrl: 'about/about.html',
    });

  $urlRouterProvider.otherwise('/home');

  //translate
  $translateProvider.translations('en', {
    'PRODUCT_NAME':'Meva Masala',
    'Tagline':'The Secret Ingredient',
    'spice':'SPICES',
    'dryfruit':'DRY FRUITS'
  });
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('escaped');
  });

