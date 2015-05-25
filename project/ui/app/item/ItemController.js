app.controller('ItemCtrl',function($scope,$translate,$stateParams,webservices,$rootScope){
  var max_quantity = 5 ;
  $scope.name = $stateParams.name;
  $scope.count = 1;

  $(document).ready(function() {
    $("#txtboxToFilter").keydown(function (e) {
      // Allow: backspace, delete, tab, escape, enter and .
      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
          // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
          // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
          // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
          // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    });
  });

  $scope.addToCart = function(name,quantity){
    if(!$scope.count || $scope.count > $scope.maxval){
      $scope.count = $scope.maxval;
    }
    $rootScope.addToCart(name,$scope.count + ' X ' + quantity);

  }
  webservices.then(function(data){
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

        break;
      }
    }
  });
});
