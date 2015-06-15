app.directive('cartCard',function($location,$timeout,$rootScope){
    return {
        restrict: 'E',
        templateUrl: 'directives/CartItemCard/CartItemCard.html',
        transclude :false,
        scope: {
            ngModel : '=',
            name: '@',
            price: '@',
            quantity : '@',
            count : '=',
            maxCount : '@'
            //recalculate: '&recalculate'
        },
        link: function(scope, element, attrs) {
            scope.countArr = [];
            for(var i = 1; i <= scope.maxCount;i++){
                scope.countArr.push(i);
            }
            var addToTotal = function(addVal, removeVal){

                    if (removeVal) {
                        $rootScope.root.total = $rootScope.root.total + addVal - removeVal;
                    } else {
                        $rootScope.root.total = $rootScope.root.total + addVal;

                }
            };
            scope.oldcount = scope.count;
            scope.alertMe = function(item){
                var oldval = scope.oldcount ;
                var newval = scope.count ;
                addToTotal(scope.getPrice(newval, scope.price), scope.getPrice(oldval, scope.price))
                scope.oldcount = scope.count;
            }
            scope.$watch('count',function(newval,oldval){
                if(newval == oldval){
                    addToTotal(scope.getPrice(newval, scope.price), 0);
                }

            });
            scope.getPrice = function(count,price){
                if(count){
                    return Math.round(parseInt(count)* parseFloat(price)* 100) / 100;
                }else{
                    return 0;
                }

            }


        }
    };
});
