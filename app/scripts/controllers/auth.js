'use strict';
 
app.controller('AuthCtrl',
  function ($scope, $location, Auth,$rootScope,Userservice) {
    if ($rootScope.signedIn()) {
      $location.path('/');
    }

    $scope.$on('$firebaseSimpleLogin:login', function () {
      $location.path('/');
    });

    $scope.login = function () {
      Auth.login($scope.user).then(function () {
        $location.path('/');
      }, function (error) {
        $scope.error = error.toString();
      });
    };
 
 
    $scope.register = function () {
      Auth.register($scope.user).then(function (authUser) {
        Userservice.create(authUser,$scope.user);
        $location.path('/');
      }, function (error) {
        $scope.error = error.toString();
      });
    };
  });