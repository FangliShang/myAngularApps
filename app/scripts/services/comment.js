'use strict';
 
app.factory('Comment', function ($resource) {
 
   return $resource('http://localhost:8088/MyPost2/webresources/model.comment/:id',{id:"@id"},{
        query:{method:'GET',isArray:true},
        create:{method:'POST'},
        find:{method:'GET'},
        update: { method:'PUT' }
    });
});