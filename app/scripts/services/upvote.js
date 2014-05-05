'use strict';
 
app.factory('UpVote', function ($resource) {
 
   return $resource('http://localhost:8088/MyPost2/webresources/model.upvote/:id',{id:"@id"},{
        query:{method:'GET',isArray:true},
        create:{method:'POST'},
        find:{method:'GET'},
        update: { method:'PUT' }
    });
});