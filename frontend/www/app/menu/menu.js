(function(jQuery, $){

  function MenuController($scope, store, appName){
    var viewModel = this;

    viewModel.profile = null;
    viewModel.name = appName;

    $scope.$on('$ionicView.enter', function(){
      viewModel.profile = store.get('profile');
    });
  }

  angular.module('tagged').controller('menuController', MenuController);

})();
