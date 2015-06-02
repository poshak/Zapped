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
            scope.bool = true;
            for(var i = 1; i <= scope.maxCount;i++){
                scope.countArr.push(i);
            }

            //var modify = function(newval,oldval){
            //
            //    //if(newval == oldval && $rootScope.root.counter){
            //    //    scope.addToTotal({'addVal':scope.getPrice(newval,scope.price),'removeVal':scope.getPrice(0,scope.price),'name':scope.name,'quantity':newval,'counter':$rootScope.root.counter});
            //    //    $rootScope.root.counter -- ;
            //    //}else {
            //    //    if(oldval){
            //    //        scope.addToTotal({
            //    //            'addVal': scope.getPrice(newval, scope.price),
            //    //            'removeVal': scope.getPrice(oldval, scope.price),
            //    //            'name': scope.name,
            //    //            'quantity': newval,'counter':$rootScope.root.counter
            //    //        });
            //    //    }
            //    //
            //    //}
            //};
            var addToTotal = function(addVal, removeVal){

                    if (removeVal) {
                        $rootScope.root.total = $rootScope.root.total + addVal - removeVal;
                    } else {
                        $rootScope.root.total = $rootScope.root.total + addVal;

                }
                //
                //if (addVal == 0) {
                //    var map = {};
                //    var mainindex = -1;
                //    for (var x in $rootScope.root.cart) {
                //        var obj = $rootScope.root.cart[x];
                //        map[obj.Name] = obj.Quantity;
                //        obj.Quantity = 0;
                //        if (obj.Name == name) {
                //            mainindex = x;
                //        }
                //    }
                //
                //    $rootScope.root.cart.splice(parseInt(mainindex), 1);
                //    for (var t in $rootScope.root.cart) {
                //        $rootScope.root.cart[t].Quantity = map[ $rootScope.root.cart[t].Name];
                //    }
                //}
                //}

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
