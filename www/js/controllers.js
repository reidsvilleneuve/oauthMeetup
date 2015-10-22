angular.module('starter')
  .controller('login', function($http, $cordovaOauth) {
    var vm = this;
    console.log('Hello!');

    vm.facebookLogin = facebookLogin;

    function facebookLogin() {
      $cordovaOauth.facebook('753481421462159', ['public_profile', 'email', 'user_photos'])
        .then(function(result) {
          console.log('cOAuth Success: ' + JSON.stringify(result));
          getProfile(result.access_token)
        })
        .catch(function(error) {
          console.log('cOAuth Error: ' + JSON.stringify(error));
        });
    }

    function getProfile(token) {
      var params = {
        access_token: token,
        fields: "id,name,gender,picture.height(961)",
        format: "json"
      };

      $http.get("https://graph.facebook.com/v2.2/me", {params: params})
        .then(function(result) {
          vm.profile = result.data;
          vm.profile.picture = vm.profile.picture.data.url;
        });
    }
  });
