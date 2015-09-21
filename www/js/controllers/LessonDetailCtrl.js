app.controller("LessonDetailCtrl", ["$scope", "$ionicModal", "$firebaseArray", "$firebaseObject", "currentAuth", "$stateParams", "$state", function($scope, $ionicModal, $firebaseArray, $firebaseObject, currentAuth, $stateParams, $state) {
  var lessonId = $stateParams.lessonId;
  var courseId = $stateParams.courseId;
  var uid = currentAuth.uid;
  var ref = new Firebase("https://lexa.firebaseio.com");
  $scope.user = $firebaseObject(ref.child('users').child(uid));

  $scope.course = $firebaseObject(ref.child('users').child(uid).child('courses').child(courseId));
  $scope.lesson = $firebaseArray(ref.child('users').child(uid).child('courses').child(courseId).child('content').orderByChild('title').equalTo(lessonId));

  $ionicModal.fromTemplateUrl('partials/rating.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.done = function(lesson) {
    ref.child('users').child(uid).child('courses').child(courseId).child('content').child(lesson.$id).update({'done': true});
    ref.child('users').child(uid).child('courses').child(courseId).update({'completed': $scope.course.completed + 1});
    if ($scope.course.length === ($scope.course.completed + 1)) {
      ref.child('users').child(uid).child('courses').child(courseId).update({'done': true});
      $scope.modal.show();
    }
  };

  $scope.like = function() {
    console.log('click');
    ref.child('publishedCourses').child($scope.course.id).child('rating').transaction(function (current_value) {
      return (current_value || 0) + 1;
    });
    $scope.modal.hide();
    $state.go('home');
  }

  $scope.dislike = function() {
    ref.child('publishedCourses').child($scope.course.id).child('rating').transaction(function (current_value) {
      return (current_value || 0) - 1;
    });
    $scope.modal.hide();
    $state.go('home');
  }


}]);