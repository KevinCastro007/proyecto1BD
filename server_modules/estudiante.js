var estudiante;
var estudiantes;
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

module.exports = function (app, mssql, configuration) {
	//Estudiantes
	app.get('/estudiantes', function (request, response) {
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.execute('dbo.RNSP_Estudiantes', function (err, recordsets, returnValue) {    	
		        estudiantes = new Array(recordsets[0].length);
		        for (var i = 0; i < recordsets[0].length; i++) {
		        	estudiante = new estructuraEstudiante();
		        	estudiante.ID = recordsets[0][i].ID;
		        	estudiante.carne = recordsets[0][i].Carne;
		        	estudiante.nombre = recordsets[0][i].Nombre;
		        	estudiante.email = recordsets[0][i].Email;
		        	estudiantes[i] = estudiante;
		        };
		    });   
		});		
		response.json(estudiantes);
	});
	//Insertar Estudiante
	app.post('/insertarEstudiante', function (request, response) {
		var carne = request.body.carne;
		var nombre = request.body.nombre;
		var email = request.body.email;		
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros
		    request.input('Carne', mssql.VarChar(50), carne);
		    request.input('Nombre', mssql.VarChar(50), nombre);
		    request.input('Email', mssql.VarChar(50), email);
		    //Ejecución del Store Procedure
		    request.execute('dbo.RNSP_InsertarEstudiante', function (err, recordsets, returnValue) {
				console.log("Ejecución efectiva del SP (INSERTAR ESTUDIANTE)");
				var respuesta = {
					resultado: returnValue
				};		    	
		    	response.json(respuesta);
		    });  	    
		});		
	});
	//Eliminar Estudiante
	app.delete('/eliminarEstudiante/:carne', function (request, response) {
		var carne = request.params.carne;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetro
		    request.input('Carne', mssql.VarChar(50), carne);
		    //Ejecución del Store Procedure
		    request.execute('dbo.RNSP_EliminarEstudiante', function (err, recordsets, returnValue) { 
				console.log("Ejecución efectiva del SP (ELIMINAR ESTUDIANTE)");
				var respuesta = {
					resultado: returnValue
				};		    	
		    	response.json(respuesta);
		    });  	    
		});			
	});
	//Editar Estudiante
	app.get('/editarEstudiante/:carne', function (request, response) {
		var carne = request.params.carne;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros
		    request.input('Carne', mssql.VarChar(50), carne);
		    //Ejecución del Store Procedure
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
	//Actualizar Estudiante
	app.put('/actualizarEstudiante/:ID', function (request, response) {
		var ID = request.params.ID;
		var carne = request.body.carne;
		var nombre = request.body.nombre;
		var email = request.body.email;		
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros
		    request.input('ID', mssql.Int, ID);
		    request.input('Carne', mssql.VarChar(50), carne);
		    request.input('Nombre', mssql.VarChar(50), nombre);
		    request.input('Email', mssql.VarChar(50), email);
		    //Ejecución del Store Procedure
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