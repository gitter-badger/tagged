(function(jQuery, $){

    function BrowseController($scope, $cordovaGeolocation){
        var viewModel = this;
        viewModel.address = null;
        viewModel.result = "";

        viewModel.useMyLocation = function(){
          var posOptions = {timeout: 10000, enableHighAccuracy: false};
          $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {

              var geocoder = new google.maps.Geocoder;
              geocoder.geocode({'location': {lat: position.coords.latitude, lng: position.coords.longitude}},
                function(results, status) {
                  if(results.length > 0){
                    viewModel.address = results[0].formatted_address;
                    $scope.$apply();
                  }
                });
              var lat  = position.coords.latitude
              var long = position.coords.longitude
          }, function(err) {
            // error
          });
        };
    }

    angular.module('tagged').controller('browseController', BrowseController);
})();
