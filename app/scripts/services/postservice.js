'use strict';
 
app.factory('Postservice', function (DownVotesByUserAndPost,DownVote,UpVotesByUserAndPost,Post,$rootScope,Auth,$q,Userservice,Comment,CommentsByIdPost,UpVote) {

  var posts=Post.query();


  

  var Postservice={
    all:posts,
    create:function(post){
      if (Auth.signedIn()){
        var user=Auth.getCurrent();
        var deferred=$q.defer();
        var promise=deferred.promise;
        post.idUser=user;
        post.score=0;
        Post.save(post,function(data){
          console.log(data.idPost+" jojo");         
            deferred.resolve(data);                                 
        });
        return promise;
      }
    },
    delete:function(idPost){
      if(Auth.signedIn()){
        Post.delete({'id':idPost},function(){
          console.log("post deleted");
        });
      }
    },
    addComment:function(idPost,comment){
      if(Auth.signedIn()){
        var deferred=$q.defer();
        var promise=deferred.promise;
        comment.idUser=Auth.getCurrent();
        Post.get({'id':idPost},function(data){
          comment.idPost=data;
          Comment.save(comment,function(aComment){
            console.log("comment saved");
            deferred.resolve(aComment);
          });
        }); 
        return promise;      
      }
    },
    findComments:function(idPost){
      console.log("lala");
      return CommentsByIdPost.query({'idPost':idPost},function(data){
        return data;
      });
    },
    deleteComment:function(idComment){
      if (Auth.signedIn()) {
        Comment.delete({'id':idComment},function(){
          console.log("comment deleted");
        });
      }
    },
    upVote:function(post){
      if(Auth.signedIn()){
        var user=Auth.getCurrent();
        var upVote={
            idPost:post,
            idUser:user
          };
          UpVote.save(upVote);
          post.score=post.score+1;
          Post.update(post);
        return upVote;     
      }
    },
    downVote: function (post) {
       if(Auth.signedIn()){
        var user=Auth.getCurrent();
        var downVote={
            idPost:post,
            idUser:user
          };
          DownVote.save(downVote);
          post.score=post.score-1;
          Post.update(post);
        return downVote;     
      }
    },
    clearVote:function(post,vote,upVoted,downVoted){
      if(Auth.signedIn()){    
          if(upVoted){
            UpVote.delete({'id':vote.idUpVote});
            post.score=post.score-1;
            Post.update(post);
            return post.score;
          }else if(downVoted){
            DownVote.delete({'id':vote.idDownVote});
            post.score=post.score+1
            Post.update(post);
            return post.score;
          }else{
            return post.score;
          }
      }
    },
    upVoted:function(post){
      if (Auth.signedIn()) {
        var deferred=$q.defer();
        var promise=deferred.promise;
        var user=Auth.getCurrent();
        UpVotesByUserAndPost.query({'idUser':user.idUser,'idPost':post.idPost},function(data){
          console.log(data);
          deferred.resolve(data);
        });
        return promise;
      }  
    },
    up:function(post){
      if (Auth.signedIn()) {       
        var user=Auth.getCurrent();
        var result=UpVotesByUserAndPost.query({'idUser':user.idUser,'idPost':post.idPost});
        return result;
      }  
    },
    downVoted: function (post) {
      if (Auth.signedIn()) {
        var deferred=$q.defer();
        var promise=deferred.promise;
        var user=Auth.getCurrent();
        DownVotesByUserAndPost.query({'idUser':user.idUser,'idPost':post.idPost},function(data){
          console.log(data);
          deferred.resolve(data);
        });
        return promise;
      }
    }
  
  };

  function setUp(data){
    Postservice.up=data;
  }

  function setDown(data){
    Postservice.down=data;
  }

  return Postservice;
});