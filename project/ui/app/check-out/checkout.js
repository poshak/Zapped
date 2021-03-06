app.controller('checkout',function($scope,$stateParams,$rootScope,$http,$window,$location,dataservice){

    $rootScope.$on('$routeChangeSuccess', function(event) {
        $window.ga('send', 'pageview', { page: $location.url() });
    });

    sessionStorage.setItem('cartObject', JSON.stringify($rootScope.root.cart));
    $rootScope.$watch('fb_name', function (newval,oldval) {
        if(!newval){
            $('#loginpage').css("display", "table");
        }else{
            $('#loginpage').css("display", "none");
        }
    });

    var orderConfirmed = false;

    $rootScope.$watch('fb_email', function (newval,oldval) {
        if(newval){
            $rootScope.details.email = newval ;
        }
    });

    if(!$rootScope.root){
        $rootScope.root = {};
    }
    if(!$rootScope.root.coupon){
        $rootScope.root.coupon = '';
    }

    var today = new Date();
    $scope.deliverydate = new Date();
    var numDate = today.getDay();
    if(numDate == 0)
    {
        $scope.deliverydate.setDate(today.getDate() + 7);
    }
    else if(numDate == 6)
    {
        $scope.deliverydate.setDate(today.getDate() + 8);
    }
    else
    {
        $scope.deliverydate.setDate(today.getDate() + (7-numDate));
    }

//$scope.areaArr = [
//    'IndiraNagar',
//    'Jeeva Bheema Nagar',
//    'Tippasandra/GM Palya',
//    'Mallespalya/Kaggadaspura',
//    'Mahadevapura',
//    'Garudacharpalya/BMP'
//];

    $scope.price = 0 ;
    for(var x in $rootScope.root.cart){
        var obj = $rootScope.root.cart[x];
        if(obj && obj.Name && obj.Quantity) {
            $scope.price = $scope.price + (parseInt(obj.Price_per_Minimum_quantity) * parseInt(obj.Quantity));
        }

    }

    if($rootScope.hideCoupon){
        $scope.price *= (1-$rootScope.hideCoupon);
        $scope.price = Math.floor($scope.price);
    }

    console.log( $scope.price);

    $scope.applyCoupon = function(){
        if($rootScope.root.coupon.toLowerCase() == 'mm05'){
            $rootScope.hideCoupon = .05;
            $scope.price *= (1-$rootScope.hideCoupon);
            $scope.price = Math.floor($scope.price);
            alert('Applied!\nNew price is : Rs.'+ $scope.price);
        }else if($rootScope.root.coupon.toLowerCase() == 'smv10'){
            $rootScope.hideCoupon = .1;
            $scope.price *= (1-$rootScope.hideCoupon);
            $scope.price = Math.floor($scope.price);
            alert('Applied!\nNew price is : Rs.'+ $scope.price);
        }else{
            alert('Not a valid code');
            $rootScope.root.coupon = '';
        }
    }

    $scope.areaArr = [
        'Bangalore',
        'Garudacharpalya/BMP',
        'Mahadevapura/HP STSD',
        'Whitefield',
        'Marathahalli/Doddanakundi',
        'Mallespalya/Kaggadaspura',
        'Tippasandra/GM Palya',
        'IndiraNagar/Domlur',
        'Koramanagala/Ejipura',
        'Jayanagar/JPNagar/BTM Layout'

    ];

    //$rootScope.details.email = 'poshak@hp.com';
    //$rootScope.details.phone = 1111111111;
    //$rootScope.details.address = 'poshak@hp.com';
    //$rootScope.details.area = $scope.areaArr[2];

  $rootScope.details.area = $scope.areaArr[0];

    $window.publishResult = function (obj){
        $('#loadingicon').css('display','none');

        if(obj.result == 'error'){
            $.unblockUI();
            console.log(obj.error);
            alert('Special characters in the Address are not allowed. Please edit and try again');
        }
        if(obj.result == 'success'){
            $('#confirm-page-data').html('Order placed ! Your order no. is '+obj['Order No.']+'<br>'+"The order details have been sent to "+$rootScope.details.email +".<br>"+"");
            showCoupon('confirmpage');
            $(document).on('click touchend', '#cs-div', function() {
                closePop('confirmpage');
                location.href = '#/list';
            });
            $(document).on('click touchend', '#vo-div', function() {
                closePop('confirmpage');
                location.href = '#/user';
            });
            $(document).on('click touchend', '#feedback-div', function() {
                var win = window.open("http://goo.gl/forms/CD4JaaUkEl", '_blank');
                win.focus();
            });
            orderConfirmed = true;
            //$('#confirmpage').css('display','table');
            //$.blockUI({
            //    message: $('#confirmpage')
            //});
            //$.blockUI({ message: $('#confirmpage') });
            //alert('Order placed ! Your order no. is '+obj['Order No.']+"\n"+"The order details have been sent to "+$rootScope.details.email +".\n"+
            //"Continue Shopping :)");
            //var stri = 'Order placed ! Your order no. is '+obj['Order No.']+"\n"+"The order details have been sent to "+$rootScope.details.email +".\n"+
            //    "Continue Shopping :)";
            //$('#confirmorder-text').innerHTML = stri;
            //$.blockUI({message : $('#confirmorder')});
            dataservice.setDataToNull();
            $scope.price = 0;
            $rootScope.root.cart = [];
            sessionStorage.setItem('cartObject', JSON.stringify($rootScope.root.cart));
            $location.path('/home');
        }
        if(obj.result == 'failed'){
            $.unblockUI();
            var str = "Could not place order due to insufficient inventory.\n ---Details--- \n";

            for(var x in obj.resultJson){
                var tempObj = obj.resultJson[x];
                if(tempObj && tempObj.Desired && tempObj.Name){
                    str = str + tempObj.Desired +" packs of " + tempObj.Name + " were ordered but only "+tempObj.Actual + " is/are present" +"\n"
                }
            }
            str += "-------------\n";
            str += "Edit cart and order again !\n";
            //$('#confirmorder-text').innerHTML = str;
            //$.blockUI({message : $('#confirmorder')});
            alert(str);
            $location.path('/cart');
        }
        $scope.$apply();
    }

    var applyDiscount = function(price){
        return 'Rs.' + Math.floor(parseInt(price)*(1-$rootScope.hideCoupon)) ;
    }
    $scope.confirm = function(){
        if($rootScope.root.cart.length <= 0){
            alert("Cart is Empty!");
            $location.path('/list');
            $scope.$apply();
            return;
        }
        var postObj= $rootScope.details ;
        orderConfirmed = false;

        //var url = "https://script.google.com/macros/s/AKfycbwm80x32nYqolLYBQatIzB9MfuA7XWAcUD9GdBUZZDLT3zr46g/exec?prefix=publishResult";
        var url = "https://script.google.com/macros/s/AKfycbx3fK0ojaoaKNEtMDvNrgkiqsBrYuPy5zCjvCDmluxR9pNe64uT/exec?prefix=publishResult&mmaction=order";

        url = url + '&email='+ postObj.email;
        url = url + '&phone='+ postObj.phone;
        url = url + '&address='+ postObj.address;
        url = url + '&area='+ postObj.area;

        var price = 0;
        var outputObj = [];
        for(var x in $rootScope.root.cart ){
            var obj = $rootScope.root.cart[x];

            if(obj && obj.Name && obj.Quantity) {
              var tmp = {};
              if(obj.Category == 'giftbox'){
                tmp[obj.Name+'['+obj.Description+']'] = obj.Quantity;
                tmp['size'] = obj.size;
              }else{
                tmp[obj.Name] = obj.Quantity;
              }
              outputObj.push(tmp);
                price = price + (obj.Price_per_Minimum_quantity * obj.Quantity);
            }
        }
        url = url + '&OrderDetails='+JSON.stringify(outputObj);
        url = url + '&Amount=Rs.'+$scope.price;
        url = url + '&DeliveryDate='+$scope.deliverydate.toDateString();
        if(price == 0){
            alert("Cart is Empty!");
            $location.path('/list');
            $scope.$apply();
            return;
        }
        $.blockUI({ message: null });
        $('#loadingicon').css('display','block');
        scrollToID('main-container');
        $.ajax({
            type:"GET",
            url: url,
            dataType : 'jsonp',
            success: function(response) {
                console.log('callback success');
                $('#loadingicon').css('display','none');
                $.unblockUI();
            },
            error: function(xhr, status, error) {
                console.log(status + '; ' + error);
                //alert('Something went wrong. Please try again.');
                $('#loadingicon').css('display','none');
                if(!orderConfirmed){
                    $.unblockUI();
                }
                //$.unblockUI();
            }
        });
    }

});
