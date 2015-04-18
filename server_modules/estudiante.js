//Variables en el contexto.
var estudiante;
var estudiantes;
//Función que retorna un JSON con la estructura de un Estudiante 
//con respecto a la BD y la Vista correspondiente.
function estructuraEstudiante() {
	var estudiante = 
	{	
		ID: 0,	
		carne: "",
		nombre: "",
		email: ""
	};
	return estudiante;
}
//Exportación del módulo correspondiente para los Estudiantes.
//Parámetros desde el Servidor: app, mssql y configuration.
module.exports = function (app, mssql, configuration) {
	//Estudiantes (server get)
	app.get('/estudiantes', function (request, response) {
		//Conexión a la BD según: configuration.
		var connection = new mssql.Connection(configuration, function (err) {
			//Request de la Conexión.
		    var request = new mssql.Request(connection);
		    //Ejecución del Store Procedure (SP).
		    request.execute('dbo.RNSP_Estudiantes', function (err, recordsets, returnValue) {    	
		        //Inicialización del Array Respuesta.  	
		        estudiantes = new Array(recordsets[0].length);
		        for (var i = 0; i < recordsets[0].length; i++) {
		        	//JSON : Estudiante
		        	estudiante = new estructuraEstudiante();
		        	estudiante.ID = recordsets[0][i].ID;
		        	estudiante.carne = recordsets[0][i].Carne;
		        	estudiante.nombre = recordsets[0][i].Nombre;
		        	estudiante.email = recordsets[0][i].Email;
		        	//Adjuntar el JSON al Array Respuesta.
		        	estudiantes[i] = estudiante;
		        };
		    });   
		});		
		//Respuesta (Array : JSON)		
		response.json(estudiantes);
	});
	//Insertar Estudiante (server post)
	app.post('/insertarEstudiante', function (request, response) {
		//Parseo de datos del Request.
		var carne = request.body.carne;
		var nombre = request.body.nombre;
		var email = request.body.email;		
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros del SP.
		    request.input('Carne', mssql.VarChar(50), carne);
		    request.input('Nombre', mssql.VarChar(50), nombre);
		    request.input('Email', mssql.VarChar(50), email);
		    request.execute('dbo.RNSP_InsertarEstudiante', function (err, recordsets, returnValue) {
				console.log("Ejecución efectiva del SP (INSERTAR ESTUDIANTE)");
				var respuesta = {
					resultado: returnValue
				};		
				//Respuesta (JSON): Resultado de la ejecución del SP.	
		    	response.json(respuesta);
		    });  	    
		});		
	});
	//Eliminar Estudiante: Según el Carné (server delete).
	app.delete('/eliminarEstudiante/:carne', function (request, response) {
		//Parámetro del Request.
		var carne = request.params.carne;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.input('Carne', mssql.VarChar(50), carne);
		    request.execute('dbo.RNSP_EliminarEstudiante', function (err, recordsets, returnValue) { 
				console.log("Ejecución efectiva del SP (ELIMINAR ESTUDIANTE)");
				var respuesta = {
					resultado: returnValue
				};		    	
		    	response.json(respuesta);
		    });  	    
		});			
	});
	//Editar Estudiante: Según el Carné (server get).
	app.get('/editarEstudiante/:carne', function (request, response) {
		var carne = request.params.carne;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.input('Carne', mssql.VarChar(50), carne);
		    request.execute('dbo.RNSP_Estudiante', function (err, recordsets, returnValue) { 
		    	var resultado = {
		    		ID: recordsets[0][0].ID,
		    		carne: recordsets[0][0].Carne,
		    		nombre: recordsets[0][0].Nombre,
		    		email: recordsets[0][0].Email
		    	};
		    	response.json(resultado);	    	
		    });  	    
		});	
	});
	//Actualizar Estudiante: Según el ID (server put).
	app.put('/actualizarEstudiante/:ID', function (request, response) {
		var ID = request.params.ID;
		var carne = request.body.carne;
		var nombre = request.body.nombre;
		var email = request.body.email;		
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.input('ID', mssql.Int, ID);
		    request.input('Carne', mssql.VarChar(50), carne);
		    request.input('Nombre', mssql.VarChar(50), nombre);
		    request.input('Email', mssql.VarChar(50), email);
		    request.execute('dbo.RNSP_ActualizarEstudiante', function (err, recordsets, returnValue) { 
				console.log("Ejecución efectiva del SP (ACTUALIZAR ESTUDIANTE)");
				var respuesta = {
					resultado: returnValue
				};		    	
		    	response.json(respuesta);
		    });  	    
		});	
	});
};