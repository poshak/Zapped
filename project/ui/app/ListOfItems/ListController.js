app.controller('ListController',function($scope,$stateParams){
  $scope.root = {};
  $scope.root.type = $stateParams.type;
  $scope.root.data = [];

  var key_arr =["Name",	"Category",	"Description",	"Place of Origin",	"Minimum quantity (in grams)",	"Price per Minimum quantity",	"Total Stock",	"Items Sold",	"Image"]

  var sample_url = "https://spreadsheets.google.com/pub?key=1d9qric1A3wSmEeKWswxrQC02QDRPZIqqjR5BaKO1jqw&hl=en&output=html";
                    //https://docs.google.com/spreadsheets/d/1d9qric1A3wSmEeKWswxrQC02QDRPZIqqjR5BaKO1jqw/pubhtml?gid=0&single=true
  var url_parameter = document.location.search.split(/\?url=/)[1]
  var url = url_parameter || sample_url;
  var googleSpreadsheet = new GoogleSpreadsheet();
  googleSpreadsheet.url(url);
  googleSpreadsheet.load(function(result) {
    var dataArr =  result.data;
    if(dataArr.length > key_arr.length){
      $scope.dataAvailable = true;
    }else{
      $scope.dataAvailable = false;
    }
    for(var i=1 ; i<dataArr.length/key_arr.length;i++){
      var j = i*key_arr.length ;
      var obj = {};
      for(var k = 0 ; k < key_arr.length;k++){
        obj[key_arr[k]] = dataArr[j+k];
      }
      $scope.root.data.push(obj);
    }
    console.log($scope.root.data);
  });
});
