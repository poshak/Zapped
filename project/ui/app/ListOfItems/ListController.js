app.controller('ListController',function($scope,$stateParams,webservices,$rootScope,$window,$location){

    $rootScope.$on('$routeChangeSuccess', function(event) {
        $window.ga('send', 'pageview', { page: $location.url() });
    });
 $scope.showObj = {};

  $scope.$watch('totalCount', function(newval, oldval){
    if(newval && newval == $scope.filteredData.length){
      //$.unblockUI();
    }else{
      if(newval == 0){
        //$.blockUI();
      }
    }
  });

    $scope.takeToList = function() {
        $window.location.href = '#/list';

        //scrollToID('main-container');
        //$scope.searchObj.Category = '';
        //$scope.root.header = '';
    }

  $scope.onImageLoad = function(name){
    $scope.totalCount++;
    $scope.showObj[name] = true;
    $scope.$apply();
  }

  $scope.root.header = $stateParams.type;
    if( $scope.root.header == 'spice'){
        $scope.root.header = 'SPICES';
    }
    if( $scope.root.header == 'dryfruit'){
        $scope.root.header = 'DRY FRUITS';
    }
    if( $scope.root.header == 'misc'){
        $scope.root.header = 'Miscellaneous';
    }

  $scope.searchObj = {
    'Category' : $stateParams.type
  }
  webservices.then(function(data){
    $scope.data = data.data;
    if($scope.data && $scope.data.constructor === Array){
      $scope.totalCount = 0;
    }else{

    }
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

  //var unblockUI = function (){
  //  $rootScope.imagesLoaded = true;
  //  //alert('loaded');
  //  $.unblockUI();
  //}
  //
  //if(!$rootScope.imagesLoaded){
  //  $.blockUI();
  //  $("#main-img-div").find('img').batchImageLoad({
  //    loadingCompleteCallback: unblockUI
  //  });
  //}

});
