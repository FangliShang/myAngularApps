'use strict';
 
app.factory('CommentsByIdUser', function ($resource) {
 	
   return $resource('http://localhost:8088/MyPost2/webresources/model.comment/findbyiduser/:idUser',{idUser:"@idUser"},{
        query:{method:'GET',isArray:true},
        create:{method:'POST'},
        find:{method:'GET'},
        update: { method:'PUT' },
        getByUsername:{method:'GET',isArray:true}
    });
});