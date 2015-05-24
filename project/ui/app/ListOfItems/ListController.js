app.controller('ListController',function($scope,$stateParams,webservices){
  if(!$scope.root){
    $scope.root = {};
  }

  $scope.root.header = $stateParams.type;

  $scope.searchObj = {
    'Category' : $stateParams.type
  }
  webservices.then(function(data){
    $scope.data = data.data;
    console.log($scope.data);
  });

  $scope.orderByaRR = [
    {name:'Popularity',id: '0'},
    {name:'Name : A to Z',id: '1'},
    {name:'Name : Z to A',id: '2'},
    {name:'Price : Low to High',id: '3'},
    {name:'Price : High to Low',id: '4'}
  ]

  if(localStorage.getItem("selected")){
    $scope.selected = $scope.orderByaRR[parseInt(localStorage.getItem("selected"))].id;
  }else {
    $scope.selected = $scope.orderByaRR[0].id;
  }

  $scope.$watch('selected',function(newval,oldval){
    if(newval == 0){
      $scope.orderByObj =  '-Items_Sold';
    }
    if(newval == 1){
      $scope.orderByObj =  'Name';
    }
    if(newval == 2){
      $scope.orderByObj =  '-Name';
    }
    if(newval == 3){
      $scope.orderByObj =  'Price_per_Minimum_quantity';
    }
    if(newval == 4){
      $scope.orderByObj =  '-Price_per_Minimum_quantity';
    }
    localStorage.setItem("selected", newval);
  });

});
