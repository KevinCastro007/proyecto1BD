//Variables en el contexto.
var profesor;
var profesores;
//Función que retorna un JSON con la estructura de un Profesor 
//con respecto a la BD y la Vista correspondiente.
function estructuraProfesor() {
	var profesor = 
	{		
		ID: 0,
		usuario: "",
		nombre: ""
	};
	return profesor;
}
//Exportación del módulo correspondiente para los Profesores.
//Parámetros desde el Servidor: app, mssql y configuration.
module.exports = function (app, mssql, configuration) {
	//Profesores (server get)
	app.get('/profesores', function (request, response) {
		//Conexión a la BD según: configuration.
		var connection = new mssql.Connection(configuration, function (err) {
			//Request de la Conexión.
		    var request = new mssql.Request(connection);
		    //Ejecución del Store Procedure (SP).
		    request.execute('dbo.RNSP_Profesores', function (err, recordsets, returnValue) {      	
		        //Inicialización del Array Respuesta.  		
		        profesores = new Array(recordsets[0].length);
		        for (var i = 0; i < recordsets[0].length; i++) {
		        	//JSON : Profesor
		        	profesor = new estructuraProfesor();
		        	profesor.ID = recordsets[0][i].ID;
		        	profesor.usuario = recordsets[0][i].Usuario;
		        	profesor.nombre = recordsets[0][i].Nombre;
		        	//Adjuntar el JSON al Array Respuesta.
		        	profesores[i] = profesor;
		        };
		    });   
		});		
		//Respuesta (Array : JSON)
		response.json(profesores);
	});
	//Insertar Profesor (server post)
	app.post('/insertarProfesor', function (request, response) {
		//Parseo de datos del Request.
		var usuario = request.body.usuario;
		var clave = request.body.clave;
		var nombre = request.body.nombre;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros del SP.
		    request.input('Usuario', mssql.VarChar(50), usuario);
		    request.input('Clave', mssql.VarChar(50), clave);
		    request.input('Nombre', mssql.VarChar(50), nombre);
		    request.execute('dbo.RNSP_InsertarProfesor', function (err, recordsets, returnValue) { 	    	
				console.log("Ejecución efectiva del SP (INSERTAR PROFESOR)");
				var respuesta = {
					resultado: returnValue
				};		
				//Respuesta (JSON): Resultado de la ejecución del SP.		
		    	response.json(respuesta);
		    });  	    
		});
	});
	//Eliminar Profesor: Según el Usuario (server delete).
	app.delete('/eliminarProfesor/:usuario', function (request, response) {
		var usuario = request.params.usuario;	
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.input('Usuario', mssql.VarChar(50), usuario);
		    request.execute('dbo.RNSP_EliminarProfesor', function (err, recordsets, returnValue) {	    	
				console.log("Ejecución efectiva del SP (ELIMINAR PROFESOR)"); 
				var respuesta = {
					resultado: returnValue
				};			
		    	response.json(respuesta);
		    });  	    
		});		
	});
	//Editar Profesor: Según el Usuario (server get).
	app.get('/editarProfesor/:usuario', function (request, response) {
		var usuario = request.params.usuario;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.input('Usuario', mssql.VarChar(50), usuario);
		    request.execute('dbo.RNSP_Profesor', function (err, recordsets, returnValue) { 
		    	var resultado = {
		    		ID: recordsets[0][0].ID,
		    		usuario: recordsets[0][0].Usuario,
		    		clave: recordsets[0][0].Clave,
		    		nombre: recordsets[0][0].Nombre
		    	};
		    	response.json(resultado);	    	
		    });  	    
		});	
	});
	//Actualizar Profesor: Según el ID (server put).
	app.put('/actualizarProfesor/:ID', function (request, response) {
		var ID = request.params.ID;
		var usuario = request.body.usuario;
		var clave = request.body.clave;
		var nombre = request.body.nombre;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.input('ID', mssql.Int, ID);	    
		    request.input('Usuario', mssql.VarChar(50), usuario);
		    request.input('Clave', mssql.VarChar(50), clave);
		    request.input('Nombre', mssql.VarChar(50), nombre);
		    request.execute('dbo.RNSP_ActualizarProfesor', function (err, recordsets, returnValue) { 
				console.log("Ejecución efectiva del SP (ACTUALIZAR PROFESOR)");
				var respuesta = {
					resultado: returnValue
				};
		    	response.json(respuesta);
		    }); 
		}); 		 	    
	});	
	//Login Profesor (server post)
	app.post('/login', function (request, response) {
		var usuario = request.body.usuario;	
		var clave = request.body.clave;			
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.input('Usuario', mssql.VarChar(50), usuario);
		    request.input('Clave', mssql.VarChar(50), clave);
		    request.execute('dbo.RNSP_IdentificarProfesor', function (err, recordsets, returnValue) { 
		    	console.log("Ejecución efectiva del SP (LOGIN)");
		    	var respuesta = {
		    		resultado: returnValue
		    	};
		    	response.json(respuesta);
		    });  
		});	
	});	
};