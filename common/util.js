const USE_MOCKS_DATASOURCE = true;

var messageList = [{
    "id": "1",
    "message": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, vel fuga. Dolorum natus consequuntur repellendus accusamus, illum sit, saepe eos reprehenderit id rem blanditiis doloremque in iste harum, placeat, omnis."
}, {
    "id": "2",
    "message": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate magni perspiciatis nobis voluptates rem quisquam non, itaque, earum animi beatae doloribus consectetur fugit, debitis aut repudiandae nam dignissimos quod. Sit."
}];

/* encuentra el indice que se va actualiza o eliminar*/
var findIndex = function(id, list){ 
    for(i = 0; i < list.length; i++){ 
        if (list[i].id == id) {
            return i;
        }
    } 
    return -1;
};

/** validar objecto para adicionar, asignando el id */
var validatedData = function(data){  
	var totalDatos;
	totalDatos += 1;
	return {
	'id': totalDatos,
	'message' : data
	}
};
