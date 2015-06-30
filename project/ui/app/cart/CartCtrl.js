app.controller('CartCtrl',function($scope,$stateParams,webservices,$rootScope,$location,$window){
    $rootScope.$on('$routeChangeSuccess', function(event) {
        $window.ga('send', 'pageview', { page: $location.url() });
    });
    $scope.hide = false;
    $scope.deleteItem = function(index){
        if(confirm('Are you sure you want to delete '+$rootScope.root.cart[index].Name+'?')){
            $rootScope.root.total = $rootScope.root.total -($rootScope.root.cart[index].Quantity*$rootScope.root.cart[index]['Price_per_Minimum_quantity']);
            $rootScope.root.cart.splice(index,1);
            $scope.$apply();
        }
    };

    $scope.takeToList = function () {
        $location.path('/list');
    }

    $scope.takeToCheckOut = function () {
        $scope.hide = true;
        $location.path('/checkout');
    }

});
