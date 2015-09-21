app.controller('CreateAccountCtrl', function($scope, $state) {
    var ref = new Firebase("https://lexa.firebaseio.com");
    $scope.inputs = {};

    $scope.create = function() {
      ref.createUser({
        email    : $scope.inputs.email,
        password : $scope.inputs.password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
          
        } else {
          ref.child('users').child(userData.uid).set({
            'name': $scope.inputs.name,
            'email': $scope.inputs.email
          });
          ref.authWithPassword({
            email    : $scope.inputs.email,
            password : $scope.inputs.password
          }, function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
            } else {
              $scope.authData = authData;
              $state.go('welcome');
            }
          });
        }
      });
    };
  });