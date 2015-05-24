app.directive('itemCard',function($location,$timeout){
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
    scope.addItemToCart = function(name){
      alert('Added '+name+' to cart');
    }
    }
  };
});
