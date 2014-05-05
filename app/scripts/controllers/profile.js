'use strict';
 
app.controller('ProfileCtrl',
  function ($scope, $routeParams, PostsByIdUser, Userservice, CommentsByIdUser) {
    Userservice.findByUsername($routeParams.username).then(function(result){
    	$scope.user=result;
    	console.log(result.idUser);
    	$scope.posts=PostsByIdUser.query({'idUser':result.idUser});
    	$scope.comments=CommentsByIdUser.query({'idUser':result.idUser});
    });
  });