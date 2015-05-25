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
      templateUrl: 'about/about.html'
    });

  $stateProvider
    .state('cart', {
      url: '/cart',
      templateUrl: 'cart/cart.html',
      controller: 'CartCtrl'
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

app.run(['$rootScope', function($rootScope) {

  var scrollToID = function goToByScroll(id){
    // Remove "link" from the ID
    id = id.replace('link', '');
    // Scroll
    jQuery('html,body').animate({
        scrollTop: jQuery('#'+id).offset().top},
      'slow');
  };

  $rootScope.$on('$locationChangeStart', function(event) {
    scrollToID('main-container');
  });

  $rootScope.addToCart = function(name, quantity){
    jQuery('.glyphicon-shopping-cart').attr("data-content", 'Added '+quantity+' of '+name+' to cart');
    jQuery('.glyphicon-shopping-cart').addClass('rotate-class');
    jQuery('.glyphicon-shopping-cart').popover('show');
    setTimeout(function () {
      jQuery('.glyphicon-shopping-cart').removeClass('rotate-class');
      jQuery('.glyphicon-shopping-cart').popover('hide');
    }, 2000);
  }

}]);


