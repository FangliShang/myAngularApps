'use strict';
 
app.controller('NavCtrl', function ($scope, $location, Postservice, Auth,User) {
    $scope.posts=Postservice.all;
    $scope.post = {url: 'http://', title: ''};
    
    var updateClock=function(){
        $scope.clock=new Date();
    };

    var timer=setInterval(function(){
        $scope.$apply(updateClock);
    },1000);

    updateClock();

    $scope.submitPost = function () {
        
        var promise=Postservice.create($scope.post);
        promise.then(function(result){
            $scope.post.idPost=result.idPost;
            $scope.posts.push($scope.post);
            console.log(result.idPost+" hihi");
            $scope.post = {url: 'http://', title: ''};
            $location.path('/posts/' + result.idPost);
        },function(reason){
            alert('Error: '+reason);
        });                
    };



    $scope.logout = function () {
  		Auth.logout();
	};
 
  });