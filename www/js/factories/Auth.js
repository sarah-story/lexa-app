app.factory('Auth', function($firebaseAuth) {
  var usersRef = new Firebase("https//lexa.firebaseio.com");
  return $firebaseAuth(usersRef);
});