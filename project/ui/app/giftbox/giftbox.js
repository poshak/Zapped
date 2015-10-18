app.controller('GiftBoxCtrl',function($scope,$location,$window,$rootScope,dataservice,$stateParams){

  var calculationVar = 0;
  $scope.count = 0;
  $scope.addedToCart = false;
  $scope.numCountArr = [1,2,3,4,5];
  $scope.numboxes = $scope.numCountArr[0];

  var boxID = $stateParams.id;
  if($stateParams.count){
    $scope.numboxes=$stateParams.count;
  }


  $(document).ready(function(){
    $("#panel2").click(function( $event){
      if(!($scope.index || $scope.index ==0)){
        alert('Please select a box first');
        $event.stopPropagation();
      }
      else{
        $("#collapseOne").collapse('hide');
        $("#collapseTwo").collapse('show');
      }

    });

    $("#panel1").click(function(){
      $("#collapseTwo").collapse('hide');
      $("#collapseOne").collapse('show');
    });

      var $item = $('.item-carousel');

      $('#moveleft').click(function(){
        if(calculationVar < 0){
        //if($('.panel-body .carousel')[0].offsetLeft > 65 && calculationVar != 0){
          $('.panel-body .carousel').animate({'left':'+=100px'});
          calculationVar += 100 ;
        }

      });

      $('#moveright').click(function(){
        if(calculationVar >  -400){
          $('.panel-body .carousel').animate({'left':'-=100px'});
          calculationVar -= 100 ;
        }

      });

  });


  $scope.boxArr = [
    {id : 'Box1' , description : '',dimensions : '34cm x 21cm x 5cm', numcolumns : 3, columncapacity : 250, displayname : 'Box option 1',price : '225'},
    {id : 'Box2' , description : '',dimensions : '25cm x 25cm x 6cm', numcolumns : 4, columncapacity : 200, displayname : 'Box option 2',price : '250'},
    {id : 'Box3' , description : '',dimensions : '28cm x 28cm x 6cm', numcolumns : 4, columncapacity : 120, displayname : 'Box option 3',price : '290'}
  ];

  var calculateTotalPrice = function(){
    var boxPrice = parseInt($scope.boxArr[$scope.index].price);
    var finalPrice = boxPrice;
    if($scope.itemCountArr ){
      for(var x in $scope.itemCountArr){
        var tmpObj = $scope.itemCountArr[x];
        if(tmpObj && tmpObj.count && tmpObj.price){
          var tmpPrice = (tmpObj.count * tmpObj.price);
          finalPrice += tmpPrice;
        }
      }
    }
  $scope.totalprice = Math.abs(finalPrice);
  }

  $scope.selectBox = function(index){
    if($scope.addedToCart){
      alert('Cannot modify this entity!');
      return;
    }
    var obj = $scope.boxArr[index];
     $scope.index = index;
    calculateTotalPrice();
  }

  $scope.selectBoxByID = function(id){
    var index ;
    for(var counter in $scope.boxArr){
      if($scope.boxArr[counter].id == id){
        index = parseInt(counter);
        break;
      }
    }
    var obj = $scope.boxArr[index];
    $scope.index = index;
    $scope.count = obj.numcolumns;
    calculateTotalPrice();
  }

  $.blockUI({ message: null });
  $('#loadingicon').css('display','block');

  dataservice.getData().then(function(data){
    if(boxID){
      $scope.addedToCart = true;
      $scope.itemCountArr = JSON.parse(sessionStorage.getItem('giftBoxObject'));
      $scope.selectBoxByID(boxID);

    }
    $scope.data = data.data;
    if($scope.data && $scope.data.constructor === Array){
    }
    $.unblockUI();
    $('#loadingicon').css('display','none');



  });

  $scope.orderByaRR = [
    {name:'Popularity',id: '0'},
    {name:'Name : A to Z',id: '1'},
    {name:'Name : Z to A',id: '2'},
    {name:'Price : Low to High',id: '3'},
    {name:'Price : High to Low',id: '4'}
  ];

  if(sessionStorage.getItem("selected")){
    $scope.selected = $scope.orderByaRR[parseInt(sessionStorage.getItem("selected"))].id;
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
    sessionStorage.setItem("selected", newval);
  });

  $scope.itemCountArr = {};
  $scope.getCalculatedVal = function(val1,val2,val3,name){
  var calVal = Math.round(val1*val2/(parseInt(val3.substring(0,val3.length-4)))) ;
    if(!$scope.itemCountArr[name]){
      $scope.itemCountArr[name] ={} ;
      $scope.itemCountArr[name].count = 0;
    }
    $scope.itemCountArr[name].price = calVal;
    return calVal;
  }



  $scope.subCount = function(name){
    if($scope.addedToCart){
      alert('Cannot modify this entity!');
      return;
    }
    if(!$scope.itemCountArr[name].count){
    }else{
      $scope.itemCountArr[name].count--;
      $scope.count -- ;
    }
    calculateTotalPrice();
  }

  $scope.addCount = function(name){
    if($scope.addedToCart){
      alert('Cannot modify this entity!');
      return;
    }

    if($scope.itemCountArr[name].count >= $scope.boxArr[$scope.index].numcolumns ){
      return;
    }
    $scope.itemCountArr[name].count++;
    $scope.count ++ ;
    calculateTotalPrice();
  }

  $scope.addGiftToCart = function(){
    if($scope.addedToCart){
      alert('Cannot modify this entity!');
      return;
    }
    var obj = {};
    obj.Name = $scope.boxArr[$scope.index].displayname ;
    obj.id =  $scope.boxArr[$scope.index].id ;
    obj.Quantity = $scope.numboxes ;
    obj.Category = 'giftbox';
    obj.giftBoxObject = JSON.stringify($scope.itemCountArr);

    obj['Price_per_Minimum_quantity'] = $scope.totalprice;
    obj.maxquantity = $scope.numCountArr.length;
    obj['Total Stock'] = $scope.numCountArr.length;
    obj.size = $scope.boxArr[$scope.index].numcolumns+'x'+$scope.boxArr[$scope.index].columncapacity+'gms';
    var descrip = '';
    for(var q in $scope.itemCountArr){
        var dexter = $scope.itemCountArr[q];
      if(dexter.count){
        descrip += dexter.count + ' ' + q +',';
      }
    }
    obj.Description = descrip.substring(0,descrip.length-1);

    $rootScope.addGiftBoxToCart(obj);
    $scope.addedToCart = true;

  }

  $scope.takeToCart = function () {
    $location.path('/cart');
  }

  $scope.takeToBox = function () {
    $location.path('/giftbox');
  }
  //$(document).ready(function(){
  //
  //  for(var x in $scope.boxArr){
  //    $("#carousel-example-generic-"+$scope.boxArr[x].name+"-prev").click(function(){
  //      $("#carousel-example-generic-"+$scope.boxArr[x].name).carousel('prev');
  //    });
  //
  //    $("#carousel-example-generic-"+$scope.boxArr[x].name+"-next").click(function(){
  //      $("#carousel-example-generic-"+$scope.boxArr[x].name).carousel('next');
  //    });
  //  }
  //
  //
  //});

});
