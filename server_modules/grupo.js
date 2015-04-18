//Variables en el contexto.
var grupo;
var grupos;
//Función que retorna un JSON con la estructura de un Grupo 
//con respecto a la BD y la Vista correspondiente.
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
//Exportación del módulo correspondiente para los Grupos.
//Parámetros desde el Servidor: app, mssql y configuration.
module.exports = function (app, mssql, configuration) {
	//Grupos (server get)
	app.get('/grupos', function (request, response) {
		//Conexión a la BD según: configuration.
		var connection = new mssql.Connection(configuration, function (err) {
			//Request de la Conexión.
		    var request = new mssql.Request(connection);
		    //Ejecución del Store Procedure (SP).
		    request.execute('dbo.RNSP_Grupos', function (err, recordsets, returnValue) {  	
		        //Inicialización del Array Respuesta.  	
		        grupos = new Array(recordsets[0].length);
		        for (var i = 0; i < recordsets[0].length; i++) {
		        	//JSON : Grupo
		        	grupo = new estructuraGrupo();
		        	grupo.ID = recordsets[0][i].ID;
		        	grupo.periodoID = recordsets[0][i].FK_PeriodoGrupo;
		        	grupo.profesorID = recordsets[0][i].Profesor;
		        	grupo.cursoID = recordsets[0][i].Curso;
		        	grupo.codigo = recordsets[0][i].Codigo;
		        	grupo.cupo = recordsets[0][i].Cupo;
		        	//Adjuntar el JSON al Array Respuesta.
		        	grupos[i] = grupo;
		        };
		    });   
		});
		//Respuesta (Array : JSON)
		response.json(grupos);
	});
	//Insertar Grupo (server post)
	app.post('/insertarGrupo', function (request, response) {
		//Parseo de datos del Request.
		var periodoID = request.body.periodo.ID;
		var profesorID = request.body.profesor.ID;
		var cursoID = request.body.curso.ID;
		var codigo = request.body.codigo;
		var cupo = request.body.cupo;		
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros del SP.
		    request.input('FK_Periodo', mssql.Int, periodoID);
		    request.input('FK_Profesor', mssql.Int, profesorID);
		    request.input('FK_Curso', mssql.Int, cursoID);
		    request.input('Codigo', mssql.VarChar(50), codigo);
		    request.input('Cupo', mssql.Int, cupo);
		    request.execute('dbo.RNSP_InsertarGrupo', function (err, recordsets, returnValue) { 	    	
				console.log("Ejecución efectiva del SP (INSERTAR GRUPO)");
				var respuesta = {
					resultado: returnValue
				};		
				//Respuesta (JSON): Resultado de la ejecución del SP.   	
		    	response.json(respuesta);
		    });  	    
		});		
	});
	//Editar Grupo: Según el Código (server get).
	app.get('/editarGrupo/:codigo', function (request, response) {
		//Parámetro del Request.
		var codigo = request.params.codigo;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.input('Codigo', mssql.VarChar(50), codigo);
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
	//Actualizar Grupo: Según el ID (server put).
	app.put('/actualizarGrupo/:ID', function (request, response) {
		var ID = request.params.ID;
		var periodoID = request.body.periodo.ID;
		var profesorID = request.body.profesor.ID;
		var cursoID = request.body.curso.ID;
		var codigo = request.body.codigo;
		var cupo = request.body.cupo;				
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.input('ID', mssql.Int, ID);	    
		    request.input('FK_Periodo', mssql.Int, periodoID);
		    request.input('FK_Profesor', mssql.Int, profesorID);
		    request.input('FK_Curso', mssql.Int, cursoID);
		    request.input('Codigo', mssql.VarChar(50), codigo);
		    request.input('Cupo', mssql.Int, cupo);
		    request.execute('dbo.RNSP_ActualizarGrupo', function (err, recordsets, returnValue) { 
				console.log("Ejecución efectiva del SP (ACTUALIZAR GRUPO)");
				var respuesta = {
					resultado: returnValue
				};
		    	response.json(respuesta);
		    }); 
		}); 			    
	});	
};