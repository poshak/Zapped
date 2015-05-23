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
      url: '@'
    },
    link: function(scope, element, attrs) {

    }
  };
});
