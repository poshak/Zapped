app.directive('flipCard',function($location,$timeout){
  return {
    restrict: 'E',
    transclude: 'true',
    templateUrl: 'directives/FlipCard/Flip-Card.html',
    scope: {
      title: '@',
      frontImage: '@',
      backImage: '@',
      frontHeader: '@',
      frontText: '@',
      backHeader: '@',
      backText: '@',
      color:'@',
      backUrl:'@',
      onSelect: '&',
      initialSelection: '=',
      filterText:'@',
      currentSelection:'=',
      domainName:'=',
      filterNode:'@'
    },
    link: function(scope, element, attrs) {

      var callUrl = function (url) {
        $timeout(function(){
          $location.url(url)
        })

      }

      scope.frontClick = function(url){
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        }else{
          if(url){
            callUrl( url.substr(1,url.length) );
          }
        }
      }

      scope.backClick = function(url){
        callUrl( url );
      }

    }
  };
});
