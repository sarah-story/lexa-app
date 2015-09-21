app.controller("LoginCtrl", function($scope, $firebaseArray, $state) {

  var ref = new Firebase("https://lexa.firebaseio.com");
  $scope.inputs = {};
  $scope.element = {};

  $scope.login = function() {
    ref.authWithPassword({
      email: $scope.inputs.email,
      password: $scope.inputs.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        $("#loginForm").animate({
          left: "+=20"
        }, 100, function() {
          $("#loginForm").animate({
            left: "-=40"
          }, 200, function() {
            $("#loginForm").animate({
              left: "+=20"
            }, 100);
          });
        });
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $scope.authData = authData;
        $state.go('home');
      }
    });
  };

  $scope.newUser = function() {
    $state.go("create_account");
  };

});