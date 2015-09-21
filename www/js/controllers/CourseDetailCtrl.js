app.controller("CourseDetailCtrl", ["$scope", "$ionicModal", "$firebaseArray", "$firebaseObject", "currentAuth", "$stateParams", "$state", function($scope, $ionicModal, $firebaseArray, $firebaseObject, currentAuth, $stateParams, $state) {
  var courseId = $stateParams.courseId;
  var uid = currentAuth.uid;
  var ref = new Firebase("https://lexa.firebaseio.com");
  $scope.user = $firebaseObject(ref.child('users').child(uid));

  $scope.course = $firebaseObject(ref.child('users').child(uid).child('courses').child(courseId));
  $scope.lessons = $firebaseArray(ref.child('users').child(uid).child('courses').child(courseId).child('content'));

  $ionicModal.fromTemplateUrl('partials/rating.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.complete = function() {
    ref.child('users').child(uid).child('courses').child(courseId).update({'done': true});
    $scope.modal.show();
  };

  $scope.like = function() {
    ref.child('publishedCourses').child($scope.course.id).child('rating').transaction(function (current_value) {
      return (current_value || 0) + 1;
    });
    $scope.modal.hide();
  }

  $scope.dislike = function() {
    ref.child('publishedCourses').child($scope.course.id).child('rating').transaction(function (current_value) {
      return (current_value || 0) - 1;
    });
    $scope.modal.hide();
  }
}]);