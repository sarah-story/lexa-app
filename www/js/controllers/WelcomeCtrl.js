app.controller("WelcomeCtrl", ["$scope", "currentAuth", "$ionicSlideBoxDelegate", "$state", function($scope, currentAuth, $ionicSlideBoxDelegate, $state) {
  $scope.go = function() {
    $state.go('library');
  }
}]);