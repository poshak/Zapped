app.controller('ListController',function($scope,$stateParams,webservices){
  if(!$scope.root){
    $scope.root = {};
  }
  $scope.search = {};
  $scope.root.type = $stateParams.type;
  $scope.search.Category = $stateParams.type;
  webservices.then(function(data){
    $scope.data = data.data;
    console.log($scope.data);
  });

});
