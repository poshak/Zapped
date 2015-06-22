app.controller('userctrl',function($scope,$stateParams,$rootScope,$window){

    $scope.allUserData = [];

    $rootScope.$watch('fb_name', function (newval,oldval) {
        if(!newval){
            $('#loginpage').css("display", "table");
        }else{
            $('#loginpage').css("display", "none");
        }
    });

    $window.readResult = function (obj){
        //console.log(obj);
        $scope.allUserData = obj;
        $scope.dupEmail = $rootScope.details.email;
        $scope.$apply();
    }

    $window.readResultEmail = function (obj) {
        alert('Email sent to : '+$scope.dupEmail);
        $('#loadingicon').css('display','none');
        $.unblockUI();
    }

    $scope.$watch('allUserData',function(newobj,oldobj){
    if(newobj && newobj.length > 0){
        $scope.outputArr = [];
        for(var x in newobj){
            var tmp = newobj[x];
           if(tmp.email == $rootScope.details.email){
            $scope.outputArr.push(tmp);
           }
        }
        $scope.$apply();
    }
    });


    $scope.sendOrderEmail = function(number){
        var url = "https://script.google.com/macros/s/AKfycbx3fK0ojaoaKNEtMDvNrgkiqsBrYuPy5zCjvCDmluxR9pNe64uT/exec?prefix=readResultEmail&mmaction=sendemail&number="+number;
        $.blockUI({ message: null });
        $('#loadingicon').css('display','block');
        $.ajax({
            type:"GET",
            url: url,
            dataType : 'jsonp',
            success: function(response) {
                console.log('callback success');
                $.unblockUI();
                $('#loadingicon').css('display','none');

            },
            error: function(xhr, status, error) {
                console.log(status + '; ' + error);
                $('#loadingicon').css('display','none');
                $.unblockUI();
            }
        });
    }

   $scope.getDetails = function(){
        if($rootScope.details.email){
            $scope.dupEmail = "";
            var url = "https://script.google.com/macros/s/AKfycbx3fK0ojaoaKNEtMDvNrgkiqsBrYuPy5zCjvCDmluxR9pNe64uT/exec?prefix=readResult&mmaction=userdetails";
            $.blockUI({ message:null });
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
                    $('#loadingicon').css('display','none');
                    $.unblockUI();
                }
            });
        }else {
            //$rootScope.details.email = 'poshakmaheshwari@gmail.com';
        }
    }

    $scope.getDetails();

});