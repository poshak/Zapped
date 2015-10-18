app.controller('HomeCtrl',function($scope,$location,$window,$rootScope){

    $rootScope.$on('$routeChangeSuccess', function(event) {
        $window.ga('send', 'pageview', { page: $location.url() });
    });
    var scopes = 'https://spreadsheets.google.com/feeds';
    var clientId = '1066960154335-q0rg2gufb6fl1m7qn4gq9qmi6sliff77.apps.googleusercontent.com';
    var apiKey = 'AIzaSyDBDkyZACm35AAQUrxa-FjvII514Dt3nt0';

    $scope.takeToList = function() {
        $location.path('/list');
    }

  $scope.takeToGiftBox = function() {
    $window.location.href = '#/giftbox';
  }

    scrollToID('main-container');
});
