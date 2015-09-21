app.controller("LibraryDetailCtrl", ["$scope", "$firebaseArray", "$firebaseObject", "currentAuth", "$stateParams", "$state", function($scope, $firebaseArray, $firebaseObject, currentAuth, $stateParams, $state) {

  var courseId = $stateParams.courseId;
  var uid = currentAuth.uid;
  var ref = new Firebase("https://lexa.firebaseio.com");
  $scope.user = $firebaseObject(ref.child('users').child(uid));

  $scope.course = $firebaseObject(ref.child('publishedCourses').child(courseId));
  $scope.lessons = $firebaseArray(ref.child('publishedCourses').child(courseId).child('content'));

  $scope.takeCourse = function(course) {
    ref.child('users').child(uid).child('courses').push({
      'title': course.title,
      'description': course.description,
      'uid': course.uid,
      'content': course.content,
      'done': false,
      'id': course.$id,
      'length': course.length,
      'completed': 0
    });
    ref.child('users').child(uid).child('courseList').push(course.$id);
  };

}]);