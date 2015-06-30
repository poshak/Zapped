'use strict';
var app = angular
  .module('app', [
    'ngAnimate',
    //'ngCookies',
    //'ngResource',
    'ui.router',
    //'ngSanitize',
    //'ngTouch',
    //  'pascalprecht.translate'
  ]);
app.config(function ($stateProvider, $urlRouterProvider) {
//routing
//  $httpProvider.defaults.useXDomain = true;
//  $httpProvider.defaults.withCredentials = true;
//  delete $httpProvider.defaults.headers.common["X-Requested-With"];
//  $httpProvider.defaults.headers.common["Accept"] = "application/json";
//  $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
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

  $stateProvider
      .state('checkout', {
        url: '/checkout',
        templateUrl: 'check-out/check-out.html',
        controller: 'checkout'
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
      .state('user', {
        url: '/user',
        templateUrl: 'user/user.html',
        controller :'userctrl'
      });

  $stateProvider
    .state('cart', {
      url: '/cart',
      templateUrl: 'cart/cart.html',
      controller: 'CartCtrl'
    });

  $urlRouterProvider.otherwise('/home');

  //translate
  //$translateProvider.translations('en', {
  //  'PRODUCT_NAME':'Meva Masala',
  //  'Tagline':'The Secret Ingredient',
  //  'spice':'SPICES',
  //  'dryfruit':'DRY FRUITS'
  //});
  //$translateProvider.preferredLanguage('en');
  //$translateProvider.useSanitizeValueStrategy('escaped');
  });

app.directive('imgLoad', ['$parse', function($parse) { // Inject $parse
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      var loadHandler = $parse(attr.imgLoad); /* Parse value of
       'imgLoad' attribute */
      element.on('load', function() {
        loadHandler(scope); /* Run the function returned by $parse.
         It needs the scope object
         to operate properly. */
      });
    }
  };
}]);

app.run(['$rootScope','webservices','$http','$templateCache','$window','$location', function($rootScope,webservices,$http,$templateCache,$window,$location) {

  $(function() {
    FastClick.attach(document.body);
  });
  $rootScope.root = {};
  $rootScope.details = {};
  $rootScope.max_quantity = 5;
  $rootScope.root.total = 0;

  var retrievedObject = sessionStorage.getItem('cartObject');
  if(retrievedObject){
    $rootScope.root.cart = JSON.parse(retrievedObject);
  }else{
    $rootScope.root.cart = [];
  }
  $rootScope.counter = 0;

  $rootScope.saveToLocalStorage = function(){
    sessionStorage.setItem('cartObject', JSON.stringify($rootScope.root.cart));
  };

  $rootScope.clearLocalStorage = function(){
    if(confirm("Are you sure you want to clear the cart ?")){
      $rootScope.root.cart = [];
      $rootScope.root.total = 0;
      $rootScope.saveToLocalStorage();
    }

  }

  var key_arr =["Name",	"Category",	"Description",	"Place of Origin",	"Minimum quantity (in grams)",	"Price_per_Minimum_quantity",	"Total Stock",	"Items_Sold",	"Image"];
  var showNotification ;

  $rootScope.$on('$locationChangeSuccess', function(event){
    ga('send', 'pageview', $location.path());
    scrollToID('main-container');
    $rootScope.root.counter = $rootScope.root.cart.length;
    $rootScope.root.total = 0;
    $("#loginpage").css("display", "none");
  });

  $rootScope.$on('$locationChangeStart', function(event) {

  });

  Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
      var k = new_index - this.length;
      while ((k--) + 1) {
        this.push(undefined);
      }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
  };

  $(document).ready(function () {
    var growlVar = $('div.growlUI');
    showNotification = function(){
      $.blockUI({
        message: growlVar,
        fadeIn: 700,
        fadeOut: 700,
        timeout: 2000,
        showOverlay: false,
        centerY: false,
        css: {
          //width: '350px',
          top: '55px',
          left: '',
          right: '10px',
          border: 'none',
          padding: '5px',
          margin : '5px',
          backgroundColor: '#000',
          '-webkit-border-radius': '10px',
          '-moz-border-radius': '10px',
          //opacity: .6,
          color: '#fff'
        }
      });
    };
  });

  $(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
      $(this).collapse('hide');
    }
  });


  var addToCardFunction = function(name, quantity){

    webservices.then(function(data){
      var main_data = data.data;
      var tmp_obj = {};
      var tmp_var = '';
      for(var x in main_data){
        var obj = main_data[x];
        if(obj.Name == name){
          tmp_obj = obj;
          tmp_var = obj['Minimum quantity (in grams)'];
          break;
        }
      }
      if(quantity){
        tmp_var = quantity +' X '+tmp_var;
      }
      var main_obj = {'Name':name , 'Quantity' : quantity};
      for(var t in key_arr){
        main_obj[key_arr[t]] = tmp_obj[key_arr[t]];
      }
      if(tmp_obj["Total Stock"] > $rootScope.max_quantity){
        main_obj['maxquantity'] = $rootScope.max_quantity;
      }else{
        main_obj['maxquantity'] = tmp_obj["Total Stock"];
      }

      $rootScope.root.cart.push(main_obj);
      $rootScope.saveToLocalStorage();

      jQuery('#growl-id').html('Added '+tmp_var+' of '+name+' to cart');
      jQuery('.glyphicon-shopping-cart').addClass('rotate-class');
      showNotification();
      setTimeout(function () {
        jQuery('.glyphicon-shopping-cart').removeClass('rotate-class');
      }, 2000);
    });
  }

  var existsInCardFunction = function(name){
    jQuery('#growl-id').html( "'" +name + "'"+ " is already in the cart.<br> In order to change the quantity, click on the cart. ");
    showNotification();
  }

  $rootScope.addToCart = function(name, quantity){
    var data = $rootScope.root.cart;

    var bool = false;
      if(data){
        for(var x in data){
          var obj = data[x];
          if(obj.Name == name){

            existsInCardFunction(name);
            bool = true;
            break;
          }
        }
        if(!bool){
          addToCardFunction(name,quantity);
        }
      }

  };

  $rootScope.checkIfItemAdded = function(name) {
    for (var x in $rootScope.root.cart) {
      var obj = $rootScope.root.cart[x];
      if(obj.Name == name){
        return true;
      }
    }
    return false;
  };

  $rootScope.root.launchLogin = function(){
    $.blockUI({
      message: $('#loginpage')
    });
    $('.blockOverlay').attr('title','Click to unblock').click($.unblockUI);
  }

  setTimeout(function(){
    console.log('Start template loading : '+new Date());

    $http.get('ListOfItems/list.html', {cache:$templateCache});
    $http.get('item/item.html', {cache:$templateCache});
    $http.get('check-out/check-out.html', {cache:$templateCache});
    $http.get('about/about.html', {cache:$templateCache});
    $http.get('user/user.html', {cache:$templateCache});
    $http.get('cart/cart.html', {cache:$templateCache});
    $http.get('directives/ItemCard/Item-Card.html', {cache:$templateCache});
    $http.get('directives/CartItemCard/CartItemCard.html', {cache:$templateCache});
    $http.get('directives/FlipCard/Flip-Card.html', {cache:$templateCache});
    $http.get('images/loading.gif', {cache:$templateCache});

    console.log('End template loading : '+new Date());
  }, 10000);

$('#count-id').css('display','block');

}]);


