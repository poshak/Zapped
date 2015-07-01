app.service('dataservice',['$http','$q','$window',function($http,$q,$window) {
var data_arr = null;
  return {
    setDataToNull: function () {
      data_arr = null;
    },
    getData: function () {
      var deferred = $q.defer();
      var instance = {};
      var data = [];
      var isNumeric = function( obj ) {
        return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
      };
      if(data_arr){
        deferred.resolve(({
          data: data_arr
        }));
      }else {
        var key_arr = ["Name", "Also named", "Category", "Description", "Place of Origin", "Minimum quantity (in grams)", "Price_per_Minimum_quantity", "Total Stock", "Items_Sold", "Image"]
        var url = "https://script.google.com/macros/s/AKfycbx3fK0ojaoaKNEtMDvNrgkiqsBrYuPy5zCjvCDmluxR9pNe64uT/exec?prefix=readList&mmaction=list";
        $.ajax({
          type: "GET",
          url: url,
          dataType: 'jsonp',
          success: function (response) {
            console.log('callback success');
          },
          error: function (xhr, status, error) {
            console.log(status + '; ' + error);
          }
        });
        $window.readList = function (obj) {
          var dataArr = obj;
          if (dataArr.length > key_arr.length) {
            for (var i = 1; i < dataArr.length / key_arr.length; i++) {
              var j = i * key_arr.length;
              var obj = {};
              for (var k = 0; k < key_arr.length; k++) {
                var val = dataArr[j + k];
                if (isNumeric(val)) {
                  obj[key_arr[k]] = parseFloat(val);
                } else {
                  obj[key_arr[k]] = val;
                }

              }
              data.push(obj);
            }
            data_arr = data
            console.log('done');
            deferred.resolve(({
              data: data
            }));
          }
        };
      }
      return deferred.promise;
    }
  }
}]);

//app.factory('webservices', ['$http','$q','$window',function($http,$q,$window) {
//  var deferred = $q.defer();
//  var instance = {};
//  var data = [];
//
//  var isNumeric = function( obj ) {
//    return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
//  };
//  var key_arr =["Name","Also named","Category",	"Description",	"Place of Origin",	"Minimum quantity (in grams)",	"Price_per_Minimum_quantity",	"Total Stock",	"Items_Sold",	"Image"]
//
//
//  var url = "https://script.google.com/macros/s/AKfycbx3fK0ojaoaKNEtMDvNrgkiqsBrYuPy5zCjvCDmluxR9pNe64uT/exec?prefix=readList&mmaction=list";
//  $window.readList = function (obj) {
//    var dataArr = obj;
//    if (dataArr.length > key_arr.length) {
//      for (var i = 1; i < dataArr.length / key_arr.length; i++) {
//        var j = i * key_arr.length;
//        var obj = {};
//        for (var k = 0; k < key_arr.length; k++) {
//          var val = dataArr[j + k];
//          if (isNumeric(val)) {
//            obj[key_arr[k]] = parseFloat(val);
//          } else {
//            obj[key_arr[k]] = val;
//          }
//
//        }
//        data.push(obj);
//      }
//      console.log('done');
//      deferred.resolve(({
//        data: data
//      }));
//    }
//  };
//  $.ajax({
//    type:"GET",
//    url: url,
//    dataType : 'jsonp',
//    success: function(response) {
//      console.log('callback success');
//    },
//    error: function(xhr, status, error) {
//      console.log(status + '; ' + error);
//    }
//  });
//
//  //var sample_url = "https://spreadsheets.google.com/pub?key=142jVnEIk8YuyK-jAhAJWXFL_LwGsf47VHU5E063mHZk&hl=en&output=html";
//  ////https://docs.google.com/spreadsheets/d/1d9qric1A3wSmEeKWswxrQC02QDRPZIqqjR5BaKO1jqw/pubhtml?gid=0&single=true
//  //var url_parameter = document.location.search.split(/\?url=/)[1];
//  //var url = url_parameter || sample_url;
//  //var googleSpreadsheet = new GoogleSpreadsheet();
//  //googleSpreadsheet.url(url);
//  //var promise = googleSpreadsheet.load(function(result) {
//  //  var dataArr = result.data;
//  //  if (dataArr.length > key_arr.length) {
//  //    for (var i = 1; i < dataArr.length / key_arr.length; i++) {
//  //      var j = i * key_arr.length;
//  //      var obj = {};
//  //      for (var k = 0; k < key_arr.length; k++) {
//  //        var val =dataArr[j + k];
//  //          if(isNumeric(val)){
//  //            obj[key_arr[k]] = parseFloat(val);
//  //          }else{
//  //            obj[key_arr[k]] = val;
//  //          }
//  //
//  //      }
//  //      data.push(obj);
//  //    }
//  //    console.log('done');
//  //    deferred.resolve(({
//  //      data:data}));
//  //  }
//  //});
//  return deferred.promise;
//}]);
