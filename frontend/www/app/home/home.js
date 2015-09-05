(function(jQuery, $){

  function HomeController(){
    var viewModel = this;
    viewModel.title = "Welcome";

  }

  angular.module('tagged').controller('homeController', HomeController);


})();
