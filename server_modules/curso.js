
//Variables en el contexto.
var curso;
var cursos;
//Función que retorna un JSON con la estructura de un Curso 
//con respecto a la BD y la Vista correspondiente.
function estructuraCurso() {
	var curso = 
	{		
		ID: 0,
		codigo: "",
		nombre: ""
	};
	return curso;
}
//Exportación del módulo correspondiente para los Cursos.
//Parámetros desde el Servidor: app, mssql y configuration.
module.exports = function (app, mssql, configuration) {
	//Cursos (server get)
	app.get('/cursos', function (request, response) {
		//Conexión a la BD según: configuration.
		var connection = new mssql.Connection(configuration, function (err) {
			//Request de la Conexión.
		    var request = new mssql.Request(connection);
		    //Ejecución del Store Procedure (SP).
		    request.execute('dbo.RNSP_Cursos', function (err, recordsets, returnValue) {    		
		        //Inicialización del Array Respuesta.  	
		        cursos = new Array(recordsets[0].length);
		        for (var i = 0; i < recordsets[0].length; i++) {
		        	//JSON : Curso
		        	curso = new estructuraCurso();
		        	curso.ID = recordsets[0][i].ID;
		        	curso.codigo = recordsets[0][i].Codigo;
		        	curso.nombre = recordsets[0][i].Nombre;
		        	//Adjuntar el JSON al Array Respuesta.
		        	cursos[i] = curso;
		        };
		    });   
		});	
		//Respuesta (Array : JSON)	
		response.json(cursos);
	});
	//Insertar Curso (server post)
	app.post('/insertarCurso', function (request, response) {
		//Parseo de datos del Request.
		var codigo = request.body.codigo;
		var nombre = request.body.nombre;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros del SP.
		    request.input('Codigo', mssql.VarChar(50), codigo);
		    request.input('Nombre', mssql.VarChar(50), nombre);
		    request.execute('dbo.RNSP_InsertarCurso', function (err, recordsets, returnValue) { 	    	
				console.log("Ejecución efectiva del SP (INSERTAR CURSO)");
				var respuesta = {
					resultado: returnValue
				};		
				//Respuesta (JSON): Resultado de la ejecución del SP.
		    	response.json(respuesta);
		    });  	    
		});		
	});
	//Eliminar Curso: Según el Código. (server delete)
	app.delete('/eliminarCurso/:codigo', function (request, response) {
		//Parámetro del Request.
		var codigo = request.params.codigo;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.input('Codigo', mssql.VarChar(50), codigo);
		    request.execute('dbo.RNSP_EliminarCurso', function (err, recordsets, returnValue) {	    	
				console.log("Ejecución efectiva del SP (ELIMINAR CURSO)"); 
				var respuesta = {
					resultado: returnValue
				};			
		    	response.json(respuesta);
		    });  	    
		});		
	});
	//Editar Curso: Según el Código (server get).
	app.get('/editarCurso/:codigo', function (request, response) {
		var codigo = request.params.codigo;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.input('Codigo', mssql.VarChar(50), codigo);
		    request.execute('dbo.RNSP_Curso', function (err, recordsets, returnValue) { 
		    	var resultado = {
		    		ID: recordsets[0][0].ID,
		    		codigo: recordsets[0][0].Codigo,
		    		nombre: recordsets[0][0].Nombre
		    	};
		    	response.json(resultado);	    	
		    });  	    
		});	
	});
	//Actualizar Curso: Según el ID (server put).
	app.put('/actualizarCurso/:ID', function (request, response) {
		var ID = request.params.ID;
		var codigo = request.body.codigo;
		var nombre = request.body.nombre;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.input('ID', mssql.Int, ID);	    
		    request.input('Codigo', mssql.VarChar(50), codigo);
		    request.input('Nombre', mssql.VarChar(50), nombre);
		    request.execute('dbo.RNSP_ActualizarCurso', function (err, recordsets, returnValue) { 
				console.log("Ejecución efectiva del SP (ACTUALIZAR CURSO)");
				var respuesta = {
					resultado: returnValue
				};
		    	response.json(respuesta);
		    }); 
		}); 		    
	});	
};