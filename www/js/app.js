var app = angular.module('LexaApp', ['ionic', 'angular.filter', 'firebase']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $state.go("login");
    }
  });
}]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$requireAuth();
      }]
    }
  }).state('courseView', {
    url: '/course/:courseId',
    templateUrl: 'partials/course_detail.html',
    controller: 'CourseDetailCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$requireAuth();
      }]
    }
  }).state('lessonView', {
    url: '/course/:courseId/lesson/:lessonId',
    templateUrl: 'partials/lesson_detail.html',
    controller: 'LessonDetailCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$requireAuth();
      }]
    }
  }).state('library', {
    url: '/library',
    templateUrl: 'partials/library.html',
    controller: 'LibraryCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$requireAuth();
      }]
    }
  }).state('libraryDetail', {
    url: '/library/:courseId',
    templateUrl: 'partials/library_detail.html',
    controller: 'LibraryDetailCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$requireAuth();
      }]
    }
  }).state('profile', {
    url: '/profile',
    templateUrl: 'partials/profile.html',
    controller: 'ProfileCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$requireAuth();
      }]
    }
  }).state('welcome', {
    url: '/welcome',
    templateUrl: 'partials/welcome.html',
    controller: 'WelcomeCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$requireAuth();
      }]
    }
  }).state('login', {
    url: '/login',
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  }).state('create_account', {
    url: '/create_account',
    templateUrl: 'partials/create_account.html',
    controller: 'CreateAccountCtrl'
  });
});