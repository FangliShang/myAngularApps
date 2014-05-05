'use strict';
 
app.controller('PostsCtrl', function ($scope,Postservice,User,$location,UpVote,Auth,DownVote) {
	if($location.path()==='/'){
        $scope.posts=Postservice.all;

    }
	
 	$scope.post = {url: 'http://', title: ''};
  
  $scope.upVotes=UpVote.query();

  $scope.downVotes=DownVote.query();



  

  $scope.upVoted=function(post){
    if(Auth.signedIn()){
      var result=false;
      var user=Auth.getCurrent();
      angular.forEach($scope.upVotes,function(upVote){
        if(upVote.idPost.idPost===post.idPost && upVote.idUser.idUser===user.idUser){
          result=true;
        }
      });
      return result;
    }   
  };

  $scope.downVoted=function(post){
    if(Auth.signedIn()){
      var result=false;
      var user=Auth.getCurrent();
      angular.forEach($scope.downVotes,function(downVote){
        if(downVote.idPost.idPost===post.idPost && downVote.idUser.idUser===user.idUser){
          result=true;
        }
      });
      return result;
    }   
  };
   
  $scope.deletePost = function (idPost,index) {
        console.log(idPost);
      Postservice.delete(idPost);
      $scope.posts.splice(index,1);
  };

  $scope.upVotePost=function(post){
    Postservice.upVoted(post).then(function(dataUp){
      if(dataUp.length!==0){
        Postservice.clearVote(post,dataUp[0],true,false);
        $scope.upVotes.splice($scope.upVotes.indexOf(dataUp[0]),1);
      }
      Postservice.downVoted(post).then(function(dataDown){
        if(dataDown.length!==0){
          Postservice.clearVote(post,dataDown[0],false,true);
          Postservice.upVote(post);
        }else if(dataDown.length===0 && dataUp.length===0){
          var aUpVote=Postservice.upVote(post);
          $scope.upVotes.push(aUpVote);

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
          $scope.downVotes.splice($scope.downVotes.indexOf(dataDown[0]),1);
        }else if(dataUp.length===0 && dataDown.length===0){
          var aDownVote=Postservice.downVote(post); 
          $scope.downVotes.push(aDownVote);  
        }
      });
    });    
  };

  /**$scope.up=[];
  $scope.down=[];

  $scope.a=function(){
    angular.forEach($scope.posts,function(post){
      Postservice.upVoted(post).then(function(data){
        if(data.length!==0){
          $scope.up[post.idPost]=true;
        }else{
          $scope.up[post.idPost]=false;
        }
      });

      Postservice.downVoted(post).then(function(data){
        if(data.length!==0){
          $scope.down[post.idPost]=true;
        }else{
          $scope.down[post.idPost]=false;
        }
      });
    });
  };**/

});