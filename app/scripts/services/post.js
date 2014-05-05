'use strict';
 
app.factory('Post', function ($resource) {
 
   return $resource('http://localhost:8088/MyPost2/webresources/model.post/:id',{id:"@id"},{
        query:{method:'GET',isArray:true},
        create:{method:'POST'},
        find:{method:'GET'},
        update: { method:'PUT', isArray:true}
    });
});