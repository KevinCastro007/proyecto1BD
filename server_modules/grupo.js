var grupo;
var grupos;
function estructuraGrupo() {
	var grupo = 
	{		
		ID: 0,
		periodoID: 0,
		profesorID: 0,
		cursoID: 0,
		codigo: "",
		cupo: 0
	};
	return grupo;
}
module.exports = function (app, mssql, configuration) {
	//Grupos
	app.get('/grupos', function (request, response) {
		response.json(grupo.grupos());
	});
	//Insertar Grupo
	app.post('/insertarGrupo', function (request, response) {
		response.json(grupo.insertar(request.body.periodo.ID,
			request.body.profesor.ID,
			request.body.curso.ID,   
			request.body.codigo, 
			request.body.cupo));
	});
	//Editar Grupo
	app.get('/editarGrupo/:codigo', function (request, response) {
		var codigo = request.params.codigo;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros
		    request.input('Codigo', mssql.VarChar(50), codigo);
		    //Ejecución del Store Procedure
		    request.execute('dbo.RNSP_Grupo', function (err, recordsets, returnValue) { 
		    	var resultado = {
		    		ID: recordsets[0][0].ID,
		    		periodoID: recordsets[0][0].FK_PeriodoGrupo,
		    		profesorID: recordsets[0][0].FK_ProfesorGrupo,
		    		cursoID: recordsets[0][0].FK_CursoGrupo,
		    		codigo: recordsets[0][0].Codigo,
		    		cupo: recordsets[0][0].Cupo
		    	};
		    	response.json(resultado);	    	
		    });  	    
		});	
	});
	//Actualizar Grupo
	app.put('/actualizarGrupo/:ID', function (request, response) {
		response.json(grupo.actualizar(request.params.ID,
			request.body.periodoID,
			request.body.profesorID,
			request.body.cursoID,
			request.body.codigo,
			request.body.cupo)); 	    
	});	
};
function grupos() {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    request.execute('dbo.RNSP_Grupos', function (err, recordsets, returnValue) {    	
	        grupos = new Array(recordsets[0].length);
	        for (var i = 0; i < recordsets[0].length; i++) {
	        	grupo = new estructuraGrupo();
	        	grupo.ID = recordsets[0][i].ID;
	        	grupo.periodoID = recordsets[0][i].FK_PeriodoGrupo;
	        	grupo.profesorID = recordsets[0][i].Profesor;
	        	grupo.cursoID = recordsets[0][i].Curso;
	        	grupo.codigo = recordsets[0][i].Codigo;
	        	grupo.cupo = recordsets[0][i].Cupo;
	        	grupos[i] = grupo;
	        };
	    });   
	});
	return grupos;
}
function insertar(periodoID, profesorID, cursoID, codigo, cupo) {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('FK_Periodo', mssql.Int, periodoID);
	    request.input('FK_Profesor', mssql.Int, profesorID);
	    request.input('FK_Curso', mssql.Int, cursoID);
	    request.input('Codigo', mssql.VarChar(50), codigo);
	    request.input('Cupo', mssql.Int, cupo);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_InsertarGrupo', function (err, recordsets, returnValue) { 	    	
			console.log("Ejecución efectiva del SP (INSERTAR GRUPO)");
			var respuesta = {
				resultado: returnValue
			};			
	    	return respuesta;
	    });  	    
	});
}
function actualizar(ID, periodoID, profesorID, cursoID, codigo, cupo) {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('ID', mssql.Int, ID);	    
	    request.input('FK_Periodo', mssql.Int, periodoID);
	    request.input('FK_Profesor', mssql.Int, profesorID);
	    request.input('FK_Curso', mssql.Int, cursoID);
	    request.input('Codigo', mssql.VarChar(50), codigo);
	    request.input('Cupo', mssql.Int, cupo);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_ActualizarGrupo', function (err, recordsets, returnValue) { 
			console.log("Ejecución efectiva del SP (ACTUALIZAR GRUPO)");
			var respuesta = {
				resultado: returnValue
			};
	    	return respuesta;
	    }); 
	}); 
}
module.exports.grupos = grupos;
module.exports.insertar = insertar;
module.exports.actualizar = actualizar;