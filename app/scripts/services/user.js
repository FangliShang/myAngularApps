'use strict';
 
app.factory('User', function ($resource) {
 	
   return $resource('http://localhost:8088/MyPost2/webresources/model.user/:id',{id:"@id"},{
        query:{method:'GET',isArray:true},
        create:{method:'POST'},
        find:{method:'GET'},
        update: { method:'PUT' },
        getByUsername:{method:'GET',isArray:true}
    });
});