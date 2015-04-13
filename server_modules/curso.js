var curso;
var cursos;
function estructuraCurso() {
	var curso = 
	{		
		ID: 0,
		codigo: "",
		nombre: ""
	};
	return curso;
}
module.exports = function (app, mssql, configuration) {
	//Cursos
	app.get('/cursos', function (request, response) {
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.execute('dbo.RNSP_Cursos', function (err, recordsets, returnValue) {    	
		        cursos = new Array(recordsets[0].length);
		        for (var i = 0; i < recordsets[0].length; i++) {
		        	curso = new estructuraCurso();
		        	curso.ID = recordsets[0][i].ID;
		        	curso.codigo = recordsets[0][i].Codigo;
		        	curso.nombre = recordsets[0][i].Nombre;
		        	cursos[i] = curso;
		        };
		    });   
		});	
		response.json(cursos);
	});
	//Insertar Curso
	app.post('/insertarCurso', function (request, response) {
		var codigo = request.body.codigo;
		var nombre = request.body.nombre;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros
		    request.input('Codigo', mssql.VarChar(50), codigo);
		    request.input('Nombre', mssql.VarChar(50), nombre);
		    //Ejecución del Store Procedure
		    request.execute('dbo.RNSP_InsertarCurso', function (err, recordsets, returnValue) { 	    	
				console.log("Ejecución efectiva del SP (INSERTAR CURSO)");
				var respuesta = {
					resultado: returnValue
				};			
		    	response.json(respuesta);
		    });  	    
		});		
	});
	//Eliminar Curso
	app.delete('/eliminarCurso/:codigo', function (request, response) {
		var codigo = request.params.codigo;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetro
		    request.input('Codigo', mssql.VarChar(50), codigo);
		    //Ejecución del Store Procedure
		    request.execute('dbo.RNSP_EliminarCurso', function (err, recordsets, returnValue) {	    	
				console.log("Ejecución efectiva del SP (ELIMINAR CURSO)"); 
				var respuesta = {
					resultado: returnValue
				};			
		    	response.json(respuesta);
		    });  	    
		});		
	});
	//Editar Curso
	app.get('/editarCurso/:codigo', function (request, response) {
		var codigo = request.params.codigo;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros
		    request.input('Codigo', mssql.VarChar(50), codigo);
		    //Ejecución del Store Procedure
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
	//Actualizar Curso
	app.put('/actualizarCurso/:ID', function (request, response) {
		var ID = request.params.ID;
		var codigo = request.body.codigo;
		var nombre = request.body.nombre;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros
		    request.input('ID', mssql.Int, ID);	    
		    request.input('Codigo', mssql.VarChar(50), codigo);
		    request.input('Nombre', mssql.VarChar(50), nombre);
		    //Ejecución del Store Procedure
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
