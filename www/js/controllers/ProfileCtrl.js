app.controller("ProfileCtrl", ["$scope", "$firebaseArray", "$firebaseObject", "currentAuth", function($scope, $firebaseArray, $firebaseObject, currentAuth) {
  var uid = currentAuth.uid;
  var ref = new Firebase("https://lexa.firebaseio.com");
  $scope.user = $firebaseObject(ref.child('users').child(uid));

  $scope.libraryCourses = $firebaseArray(ref.child('publishedCourses'));

  $scope.userCourses = $firebaseArray(ref.child('users').child(uid).child('courses'));

  $scope.unAuth = function() {
      ref.unauth();
    };

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