app.controller('CartCtrl',function($scope,$translate,$stateParams,webservices,$rootScope){
    $scope.placeOrder = function(){
        alert('Coming up soon!');
    }

    $scope.deleteItem = function(index){
        if(confirm('Are you sure you want to delete '+$rootScope.root.cart[index].Name+'?')){
            $rootScope.root.total = $rootScope.root.total -($rootScope.root.cart[index].Quantity*$rootScope.root.cart[index]['Price_per_Minimum_quantity']);
            $rootScope.root.cart.splice(index,1);
            $scope.$apply();
            //for (var x in $rootScope.root.cart) {
            //    var obj = $rootScope.root.cart[x];
            //    if (obj.Name == scope.name) {
            //        $rootScope.counter = $rootScope.root.cart.length - parseInt(x) -1 ;
            //        $rootScope.root.cart.move(parseInt(x), 0);
            //        break;
            //    }
            //}
            //$rootScope.root.cart.shift();
        }
    }

    //$scope.$watch('root.cart', function(newval){
    //    if(newval){
    //        console.log('cart changed');
    //        $rootScope.saveToLocalStorage();
    //    }
    //});

});
