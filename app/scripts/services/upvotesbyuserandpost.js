'use strict';
 
app.factory('UpVotesByUserAndPost', function ($resource) {
 	
   return $resource('http://localhost:8088/MyPost2/webresources/model.upvote/findbyuserandpost/:idUser/:idPost',{idUser:"@idUser",idPost:"@idPost"},{
        query:{method:'GET',isArray:true},
        create:{method:'POST'},
        find:{method:'GET'},
        update: { method:'PUT' },
        getByUsername:{method:'GET',isArray:true}
    });
});