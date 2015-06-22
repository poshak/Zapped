app.controller('checkout',function($scope,$stateParams,$rootScope,$http,$window,$location){
    sessionStorage.setItem('cartObject', JSON.stringify($rootScope.root.cart));
    $rootScope.$watch('fb_name', function (newval,oldval) {
        if(!newval){
            $('#loginpage').css("display", "table");
        }else{
            $('#loginpage').css("display", "none");
        }
    });

    $rootScope.$watch('fb_email', function (newval,oldval) {
        if(newval){
            $rootScope.details.email = newval ;
        }
    });

//$scope.areaArr = [
//    'IndiraNagar',
//    'Jeeva Bheema Nagar',
//    'Tippasandra/GM Palya',
//    'Mallespalya/Kaggadaspura',
//    'Mahadevapura',
//    'Garudacharpalya/BMP'
//];

    $scope.price1 = 0 ;
    for(var x in $rootScope.root.cart){
        var obj = $rootScope.root.cart[x];
        if(obj && obj.Name && obj.Quantity) {
            $scope.price1 = $scope.price1 + (parseInt(obj.Price_per_Minimum_quantity) * parseInt(obj.Quantity));
        }

    }

    console.log( $scope.price1);

    $scope.areaArr = [
        'Garudacharpalya/BMP',
        'Mahadevapura',
        'Mallespalya/Kaggadaspura',
        'Tippasandra/GM Palya',
        'Jeeva Bheema Nagar',
        'IndiraNagar'
    ];

    //$rootScope.details.email = 'poshak@hp.com';
    //$rootScope.details.phone = 1111111111;
    //$rootScope.details.address = 'poshak@hp.com';
    //$rootScope.details.area = $scope.areaArr[2];


    $window.publishResult = function (obj){
        $('#loadingicon').css('display','none');
        $.unblockUI();
        if(obj.result == 'error'){
            console.log(obj.error);
            alert('Special characters in the Address are not allowed. Please edit and try again');
        }
        if(obj.result == 'success'){
            alert('Order placed ! Your order no. is '+obj['Order No.']+"\n"+"The order details have been sent to "+$rootScope.details.email +".\n"+
            "Continue Shopping :)");
            //var stri = 'Order placed ! Your order no. is '+obj['Order No.']+"\n"+"The order details have been sent to "+$rootScope.details.email +".\n"+
            //    "Continue Shopping :)";
            //$('#confirmorder-text').innerHTML = stri;
            //$.blockUI({message : $('#confirmorder')});

            $rootScope.root.cart = [];
            sessionStorage.setItem('cartObject', JSON.stringify($rootScope.root.cart));
            $location.path('/list');
        }
        if(obj.result == 'failed'){
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
        return 'Rs.' + price ;
    }
    $scope.confirm = function(){
        if($rootScope.root.cart.length <= 0){
            alert("Cart is Empty!");
            $location.path('/list');
            $scope.$apply();
            return;
        }
        var postObj= $rootScope.details ;

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
                tmp[obj.Name] = obj.Quantity;
                outputObj.push(tmp);
                price = price + (obj.Price_per_Minimum_quantity * obj.Quantity);
            }
        }
        url = url + '&OrderDetails='+JSON.stringify(outputObj);
        url = url + '&Amount='+applyDiscount(price);
        if(price == 0){
            alert("Cart is Empty!");
            $location.path('/list');
            $scope.$apply();
            return;
        }
        $.blockUI({ message: null });
        $('#loadingicon').css('display','block');
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
                $.unblockUI();
            }
        });
    }

});