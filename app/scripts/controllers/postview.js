'use strict';
 
app.controller('PostViewCtrl', function ($scope,$routeParams,Postservice,User,Post) {

	console.log($routeParams.postId);
 
    $scope.post = Post.get({'id':$routeParams.postId});

    $scope.commentsOfPost=Postservice.findComments($routeParams.postId);


    $scope.addComment=function(){
    	var promise=Postservice.addComment($routeParams.postId,$scope.comment);
        promise.then(function(result){
            $scope.commentsOfPost.push(result);
        },function(reason){
            alert('Error: '+reason);
        }); 
    	$scope.comment='';
    };

    $scope.removeComment= function(idComment,index){
        Postservice.deleteComment(idComment);
        $scope.commentsOfPost.splice(index,1);
    };


    $scope.upVotePost=function(post){
        Postservice.upVoted(post).then(function(dataUp){
          if(dataUp.length!==0){
            Postservice.clearVote(post,dataUp[0],true,false);
          }
          Postservice.downVoted(post).then(function(dataDown){
            if(dataDown.length!==0){
              Postservice.clearVote(post,dataDown[0],false,true);
              Postservice.upVote(post);
            }else if(dataDown.length===0 && dataUp.length===0){
              Postservice.upVote(post);
            }
          });
        });     
      };

      $scope.downVotePost=function(post){
        Postservice.upVoted(post).then(function(dataUp){
          if(dataUp.length!==0){
            Postservice.clearVote(post,dataUp[0],true,false);
            Postservice.downVote(post);
          }
          Postservice.downVoted(post).then(function(dataDown){
            if(dataDown.length!==0){
              Postservice.clearVote(post,dataDown[0],false,true);
            }else if(dataUp.length===0 && dataDown.length===0){
              Postservice.downVote(post);
            }
          });
        });   
      };

  });