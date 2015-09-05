(function(jQuery, $){

  function AccountController($location, auth, store){
    var viewModel = this;
    viewModel.profile = null;


    viewModel.login = function() {
      console.log("login");
      auth.signin({
        authParams: {
          scope: 'openid offline_access',
          device: 'Mobile device'
        }
      }, function(profile, token, accessToken, state, refreshToken) {
        console.log("callback");
        store.set('profile', profile);
        store.set('token', token);
        store.set('refreshToken', refreshToken);
        $location.path('#/app/home');
      }, function(err) {
          console.dir(err);
      });
    };

    viewModel.logout = function(){
        auth.signout();
        store.remove('profile');
        store.remove('token');
        viewModel.profile = null;
      };

    var init = function(){
      viewModel.profile = store.get('profile');
    };

    init();
  }

  angular.module('tagged').controller('accountController', AccountController);
})();
