'use strict';
 
app.factory('DownVotesByUserAndPost', function ($resource) {
 	
   return $resource('http://localhost:8088/MyPost2/webresources/model.downvote/findbyuserandpost/:idUser/:idPost',{idUser:"@idUser",idPost:"@idPost"},{
        query:{method:'GET',isArray:true},
        create:{method:'POST'},
        find:{method:'GET'},
        update: { method:'PUT' },
        getByUsername:{method:'GET',isArray:true}
    });
});