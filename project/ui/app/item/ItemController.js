app.controller('ItemCtrl',function($scope,$stateParams,dataservice,$rootScope){
  $.blockUI({ message: null });
  $('#loadingicon').css('display','block');
  var max_quantity = $rootScope.max_quantity ;
  $scope.parent = {};

  $scope.countArr = [];
  for(var i = 1; i <= max_quantity;i++){
    $scope.countArr.push(i);
  }
  $scope.name = $stateParams.name;
  $scope.parent.counter1 = 1;

  $scope.onLoad = function(){
    $scope.imageLoaded = true;
    $scope.$apply();
  }

  $scope.addToCart = function(name,quantity){
    $scope.disabledVal = true;
    $rootScope.addToCart(name,$scope.parent.counter1);

  }

  for(var x in $rootScope.root.cart){
    var obj = $rootScope.root.cart[x];
    if(obj.Name == $scope.name ){
      $scope.disabledVal = true;
    }
  }
  dataservice.getData().then(function(data){
    $.unblockUI();
    $('#loadingicon').css('display','none');
    var data_arr = data.data;
    for(var x in data_arr){
      var obj = data_arr[x];
      if($scope.name == obj.Name){
        $scope.data = obj;
        if(max_quantity > $scope.data['Total Stock']){
          $scope.maxval =$scope.data['Total Stock'];
        }else{
          $scope.maxval =max_quantity;
        }
        $scope.countArr = [];
        for(var i = 1; i <= $scope.maxval;i++){
          $scope.countArr.push(i);
        }

        break;
      }
    }
  });
});
