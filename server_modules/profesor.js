var profesor;
var profesores;
function estructuraProfesor() {
	var profesor = 
	{		
		ID: 0,
		usuario: "",
		nombre: ""
	};
	return profesor;
}
module.exports = function (app, mssql, configuration) {
	app.get('/profesores', function (request, response) {
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.execute('dbo.RNSP_Profesores', function (err, recordsets, returnValue) {    	
		        profesores = new Array(recordsets[0].length);
		        for (var i = 0; i < recordsets[0].length; i++) {
		        	profesor = new estructuraProfesor();
		        	profesor.ID = recordsets[0][i].ID;
		        	profesor.usuario = recordsets[0][i].Usuario;
		        	profesor.nombre = recordsets[0][i].Nombre;
		        	profesores[i] = profesor;
		        };
		    });   
		});		
		response.json(profesores);
	});
	//Insertar Profesor
	app.post('/insertarProfesor', function (request, response) {
		var usuario = request.body.usuario;
		var clave = request.body.clave;
		var nombre = request.body.nombre;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros
		    request.input('Usuario', mssql.VarChar(50), usuario);
		    request.input('Clave', mssql.VarChar(50), clave);
		    request.input('Nombre', mssql.VarChar(50), nombre);
		    //Ejecución del Store Procedure
		    request.execute('dbo.RNSP_InsertarProfesor', function (err, recordsets, returnValue) { 	    	
				console.log("Ejecución efectiva del SP (INSERTAR PROFESOR)");
				var respuesta = {
					resultado: returnValue
				};			
		    	response.json(respuesta);
		    });  	    
		});
	});
	//Eliminar Profesor
	app.delete('/eliminarProfesor/:usuario', function (request, response) {
		var usuario = request.params.usuario;		
		console.log(usuario);
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetro
		    request.input('Usuario', mssql.VarChar(50), usuario);
		    //Ejecución del Store Procedure
		    request.execute('dbo.RNSP_EliminarProfesor', function (err, recordsets, returnValue) {	    	
				console.log("Ejecución efectiva del SP (ELIMINAR PROFESOR)"); 
				var respuesta = {
					resultado: returnValue
				};			
		    	response.json(respuesta);
		    });  	    
		});		
	});
	//Editar Profesor
	app.get('/editarProfesor/:usuario', function (request, response) {
		var usuario = request.params.usuario;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros
		    request.input('Usuario', mssql.VarChar(50), usuario);
		    //Ejecución del Store Procedure
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
	//Actualizar Profesor
	app.put('/actualizarProfesor/:ID', function (request, response) {
		var ID = request.params.ID;
		var usuario = request.body.usuario;
		var clave = request.body.clave;
		var nombre = request.body.nombre;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros
		    request.input('ID', mssql.Int, ID);	    
		    request.input('Usuario', mssql.VarChar(50), usuario);
		    request.input('Clave', mssql.VarChar(50), clave);
		    request.input('Nombre', mssql.VarChar(50), nombre);
		    //Ejecución del Store Procedure
		    request.execute('dbo.RNSP_ActualizarProfesor', function (err, recordsets, returnValue) { 
				console.log("Ejecución efectiva del SP (ACTUALIZAR PROFESOR)");
				var respuesta = {
					resultado: returnValue
				};
		    	response.json(respuesta);
		    }); 
		}); 		 	    
	});	
	//Login Profesor
	app.post('/login', function (request, response) {
		var usuario = request.body.usuario;	
		var clave = request.body.clave;			
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros
		    request.input('Usuario', mssql.VarChar(50), usuario);
		    request.input('Clave', mssql.VarChar(50), clave);
		    //Ejecución del Store Procedure
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