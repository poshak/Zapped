app.directive('itemCard',function($location,$timeout,$rootScope){
  return {
    restrict: 'E',
    transclude: 'true',
    templateUrl: 'directives/ItemCard/Item-Card.html',
    scope: {
      image: '@',
      name: '@',
      price: '@',
      type: '@',
      description: '@',
      quantity: '@',
      place: '@',
      func: '&func',
      available : '@'
    },
    link: function(scope, element, attrs) {
    scope.addItemToCart = function(name,quantity){
      $rootScope.addToCart(name,1);
    }

      scope.onLoad = function(name){
        scope.ImageLoaded = true;
        scope.func({'name':name});
        scope.showOOS = true;
        scope.$apply();
        //alert(scope.available);
      };

      scope.checkIfAdded = function(name){
        return $rootScope.checkIfItemAdded(name);
      }


    }
  };
});
