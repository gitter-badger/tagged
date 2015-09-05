(function(jQuery, $){

    function BrowseController($scope, $cordovaGeolocation, store){
        var viewModel = this;
        viewModel.location = null;
        viewModel.result = "";
        viewModel.isLocating = false;

        viewModel.useMyLocation = function(){
          viewModel.isLocating = true;
          var posOptions = {timeout: 10000, enableHighAccuracy: false};
          $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
              var geocoder = new google.maps.Geocoder;
              geocoder.geocode({'location': {lat: position.coords.latitude, lng: position.coords.longitude}},
                function(results, status) {
                  if(results.length > 0){
                    viewModel.location = {
                      title: results[0].formatted_address,
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                    };
                    store.set('lastLocation', viewModel.location);
                    viewModel.isLocating = false;
                    $scope.$apply();
                  }
                });
          }, function(err) {
              viewModel.isLocating = false;
              $scope.$apply();
          });
        };

        $scope.$on('$ionicView.enter', function(){
          viewModel.location = store.get('lastLocation');
        });
    }

    angular.module('tagged').controller('browseController', BrowseController);
})();
