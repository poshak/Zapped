app.factory('webservices', ['$http','$q',function($http,$q) {
  var deferred = $q.defer();
  var instance = {};
  var data = [];

  var isNumeric = function( obj ) {
    return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
  };
  var key_arr =["Name",	"Category",	"Description",	"Place of Origin",	"Minimum quantity (in grams)",	"Price_per_Minimum_quantity",	"Total Stock",	"Items_Sold",	"Image"]

  var sample_url = "https://spreadsheets.google.com/pub?key=1d9qric1A3wSmEeKWswxrQC02QDRPZIqqjR5BaKO1jqw&hl=en&output=html";
  //https://docs.google.com/spreadsheets/d/1d9qric1A3wSmEeKWswxrQC02QDRPZIqqjR5BaKO1jqw/pubhtml?gid=0&single=true
  var url_parameter = document.location.search.split(/\?url=/)[1];
  var url = url_parameter || sample_url;
  var googleSpreadsheet = new GoogleSpreadsheet();
  googleSpreadsheet.url(url);
  var promise = googleSpreadsheet.load(function(result) {
    var dataArr = result.data;
    if (dataArr.length > key_arr.length) {
      for (var i = 1; i < dataArr.length / key_arr.length; i++) {
        var j = i * key_arr.length;
        var obj = {};
        for (var k = 0; k < key_arr.length; k++) {
          var val =dataArr[j + k];
            if(isNumeric(val)){
              obj[key_arr[k]] = parseFloat(val);
            }else{
              obj[key_arr[k]] = val;
            }

        }
        data.push(obj);
      }
      console.log('done');
      deferred.resolve(({
        data:data}));
    }
  });
  return deferred.promise;
}]);

//app.service('webservices', ['$http', function($http) {
//  var data = [];
//  var key_arr =["Name",	"Category",	"Description",	"Place of Origin",	"Minimum quantity (in grams)",	"Price per Minimum quantity",	"Total Stock",	"Items Sold",	"Image"]
//
//  var sample_url = "https://spreadsheets.google.com/pub?key=1d9qric1A3wSmEeKWswxrQC02QDRPZIqqjR5BaKO1jqw&hl=en&output=html";
//  //https://docs.google.com/spreadsheets/d/1d9qric1A3wSmEeKWswxrQC02QDRPZIqqjR5BaKO1jqw/pubhtml?gid=0&single=true
//  var url_parameter = document.location.search.split(/\?url=/)[1];
//  var url = url_parameter || sample_url;
//  var googleSpreadsheet = new GoogleSpreadsheet();
//  googleSpreadsheet.url(url);
//  googleSpreadsheet.load(function(result) {
//    var dataArr = result.data;
//    if (dataArr.length > key_arr.length) {
//      for (var i = 1; i < dataArr.length / key_arr.length; i++) {
//        var j = i * key_arr.length;
//        var obj = {};
//        for (var k = 0; k < key_arr.length; k++) {
//          obj[key_arr[k]] = dataArr[j + k];
//        }
//        data.push(obj);
//      }
//  }
//  });
//
//    return {
//
//    };
//  }]);
