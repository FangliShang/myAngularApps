'use strict';
 
app.factory('Userservice', function (User,$rootScope,UserByName,UserByEmail,$q) {

  var users = User.query();
 
  var Userservice = {
    create: function (authUser, user) {
        var aUser = {
          username: user.username,
          email:user.email,
          password:user.password,
          md5Hash: authUser.md5_hash
        };
 
      User.save(aUser,function(data){
        console.log(data+" ooooooooooo");
        setCurrent(data.username);
      });
    },

    findByUsername: function(username){
      if(username){
        var deferred=$q.defer();
        var promise=deferred.promise;
        console.log(username);
        UserByName.query({'name':username},function(data){
          //$rootScope.currentUser=data[0];
          console.log("coucou");
          console.log(data[0]);
          deferred.resolve(data[0]);
        });
        return promise;
      }
    },

    setCurrentUser:function(username){
      setCurrent(username);
    },

    findByEmail: function(email){
      if(email){
        var deferred=$q.defer();
        var promise=deferred.promise;
        console.log(email);
        UserByEmail.query({'email':email},function(data){
          //$rootScope.currentUser=data[0];
          console.log("coucou");
          console.log(data[0]);
          deferred.resolve(data[0]);  
        });
        return promise;
      }
    }


  };

    function setCurrent(username) {
      var promise=Userservice.findByUsername(username);
      promise.then(function(result){
            $rootScope.currentUser=result;
        },function(reason){
            alert('Error: '+reason);
        });        
    }
  
 
  return Userservice;
});