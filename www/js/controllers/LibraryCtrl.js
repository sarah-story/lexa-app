app.controller("LibraryCtrl", ["$scope", "$ionicModal", "$firebaseArray", "$firebaseObject", "currentAuth", function($scope, $ionicModal, $firebaseArray, $firebaseObject, currentAuth) {
  var uid = currentAuth.uid;
  var ref = new Firebase("https://lexa.firebaseio.com");
  $scope.user = $firebaseObject(ref.child('users').child(uid));

  $scope.libraryCourses = $firebaseArray(ref.child('publishedCourses'));

  $scope.userCourses = $firebaseArray(ref.child('users').child(uid).child('courseList'));

  $scope.searchTerm = "";

  $scope.cancel = function() {
    $scope.searchTerm = "";
  }

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