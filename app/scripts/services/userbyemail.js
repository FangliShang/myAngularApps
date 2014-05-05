'use strict';
 
app.factory('UserByEmail', function ($resource) {
 	
   return $resource('http://localhost:8088/MyPost2/webresources/model.user/findemail/:email',{email:"@email"},{
        query:{method:'GET',isArray:true},
        create:{method:'POST'},
        find:{method:'GET'},
        update: { method:'PUT' }
    });
});