'use strict';
 
app.factory('CommentsByIdPost', function ($resource) {
 	
   return $resource('http://localhost:8088/MyPost2/webresources/model.comment/findcomments/:idPost',{idPost:"@idPost"},{
        query:{method:'GET',isArray:true},
        create:{method:'POST'},
        find:{method:'GET'},
        update: { method:'PUT' }
    });
});