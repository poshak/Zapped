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
      place: '@'
    },
    link: function(scope, element, attrs) {
    scope.addItemToCart = function(name,quantity){
      $rootScope.addToCart(name,quantity);
    }
    }
  };
});
