app.controller("HomeCtrl", ["$scope", "$ionicModal", "$firebaseArray", "$firebaseObject", "$ionicActionSheet", "currentAuth", function($scope, $ionicModal, $firebaseArray, $firebaseObject, $ionicActionSheet, currentAuth) {
  var uid = currentAuth.uid;
  var ref = new Firebase("https://lexa.firebaseio.com");
  $scope.user = $firebaseObject(ref.child('users').child(uid));

  $scope.unAuth = function() {
    ref.unauth();
  };

  $scope.userCourses = $firebaseArray(ref.child('users').child(uid).child('courses'));

  $ionicModal.fromTemplateUrl('partials/rating.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.show = function(course) {
    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Mark As Complete' }
      ],
      destructiveText: 'Delete',
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        ref.child('users').child(uid).child('courses').child(course.$id).update({'done': true});
        hideSheet();
        $scope.modal.show();
        $scope.like = function() {
          ref.child('publishedCourses').child(course.id).child('rating').transaction(function (current_value) {
            return (current_value || 0) + 1;
          });
          $scope.modal.hide();
        };

        $scope.dislike = function() {
          ref.child('publishedCourses').child(course.id).child('rating').transaction(function (current_value) {
            return (current_value || 0) - 1;
          });
          $scope.modal.hide();
        };
      },
      destructiveButtonClicked: function() {
        ref.child('users').child(uid).child('courses').child(course.$id).remove();
        var courseIds = $firebaseArray(ref.child('users').child(uid).child('courseList'));
        courseIds.$loaded(function() {
          var courseListId;
          for (var i=0; i<courseIds.length; i++) {
            if (courseIds[i].$value === course.id) {
              courseListId = courseIds[i].$id;
            }
          }
          ref.child('users').child(uid).child('courseList').child(courseListId).remove();
        });
        hideSheet();
      }
    });

  };

}]);