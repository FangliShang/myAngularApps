'use strict';
 
app.factory('Auth',
  function ($firebaseSimpleLogin, FIREBASE_URL,$rootScope,Userservice) {
    var ref = new Firebase(FIREBASE_URL);
 
    var auth = $firebaseSimpleLogin(ref);
 
    var Auth = {
      register: function (user) {
        return auth.$createUser(user.email, user.password);
      },
      signedIn: function () {
        return $rootScope.currentUser!==undefined;
      },
      login:function(user){
        return auth.$login('password',user);
      },
      logout: function () {
        auth.$logout();
      },
      getCurrent:function(){
        return $rootScope.currentUser;
      }
    };

    $rootScope.signedIn = function () {
      return Auth.signedIn();
    };


    $rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {
      console.log(authUser);
      var promise=Userservice.findByEmail(authUser.email);
      promise.then(function(result){
            $rootScope.currentUser=result;
        },function(reason){
            alert('Error: '+reason);
        });    
    
      /**var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid));
     
      query.$on('loaded', function () {
        console.log(query.$getIndex()[0]);
        //Userservice.setCurrentUser(query.$getIndex()[0]);
        Userservice.findByUsername(query.$getIndex()[0]); 
      });**/
    });

    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
      delete $rootScope.currentUser;
    });
 
    return Auth;
  });