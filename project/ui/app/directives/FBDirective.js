
$('#fbicon').click(function() {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var win
    if(width > 768){
        win = window.open("https://www.facebook.com/mevamasalastore", '_blank');
        win.focus()
    }else{
        var now = new Date().valueOf();
        setTimeout(function () {
            if (new Date().valueOf() - now > 100) return;
            window.location = "https://m.facebook.com/mevamasalastore";
        }, 100);
        window.location = "fb://page/108745912794003";
    }
    ;
});

var uservar = null;
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response,$rootScope) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        //$.unblockUI();
        // Logged into your app and Facebook.
        testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '1591070074488697',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.3' // use version 2.2
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    $("#fb-button").css("display", "block");
    $("#fb-button-span").innerHTML = "Login using Facebook";

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
    FB.Event.subscribe('edge.create',
        function(response) {
            $('#couponpage-text').html("Use coupon 'MM05' at check out and get 5% discount.");
            showCoupon('couponpage');
        }
    );
    FB.Event.subscribe('edge.remove', function(targetUrl, elm) {
        $('#couponpage-text').html("Login with Facebook and like our page to get 5% discount coupon.");
    });

    if(sessionStorage.getItem('xyz') == 'true'){

    }else{
        setTimeout(function(){
            showCoupon('couponpage');
            sessionStorage.setItem('xyz', 'true');
        },20000);
    }



};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    $('#fb-button').css('display','none');
    $('#fb-button1').css('display','none');
    FB.api('/me', function(response) {
        var $body = angular.element(document.body);            // 1
        var $rootScope = $body.injector().get('$rootScope');   // 2b
        $rootScope.$apply(function () {              // 3
            $rootScope.fb_name = response.name;
            uservar = response.name;
            $rootScope.fb_email = response.email;
        });
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });

    FB.api('/me/likes/108745912794003', function(response) {
        console.log(response.data);
        if(response.data.length > 0){
            $('#couponpage-text').html("Use coupon 'MM05' at check out and get 5% discount.");
            console.log('already liked');
        }
    });
}
var showCoupon =  function(str){
    if($('#'+str).css('display') == 'table'){
        return;
    }
    $(document).ready(function() {
        scrollToID('main-container');
        $.blockUI({ message: null });
        $('.blockUI').css('z-index',10000);
        $('.blockOverlay').attr('title','Click to unblock').click(function() {
            $('#'+str).css('display','none');
            $.unblockUI();
            return false;
        });
        $('#'+str).css('display','table');
        $(document).on('click touchend', '#closeBox', function() {
            closePop(str);
        });

    });
};

var scrollToID = function goToByScroll(id){
    // Remove "link" from the ID
    id = id.replace('link', '');
    // Scroll
    jQuery('html,body').animate({
            scrollTop: jQuery('#'+id).offset().top},
        'slow');
};


var closePop = function(str){
    $('#'+str).css('display','none');
    $.unblockUI();
    return false;
}

$(document).on('click', '#offers', function() {
    showCoupon('couponpage');
});
