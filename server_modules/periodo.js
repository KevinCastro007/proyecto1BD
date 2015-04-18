//Variables en el contexto.
var periodo;
var periodos;
//Función que retorna un JSON con la estructura de un Periodo 
//con respecto a la BD y la Vista correspondiente.
function estructuraPeriodo() {
	var periodo = 
	{
		ID: 0,
		fechaInicio: "",
		fechaFin: ""
	};
	return periodo;
}
//Exportación del módulo correspondiente para los Periodos.
//Parámetros desde el Servidor: app, mssql y configuration.
module.exports = function (app, mssql, configuration) {
	//Periodos (server get)
	app.get('/periodos', function (request, response) {
		//Conexión a la BD según: configuration.
		var connection = new mssql.Connection(configuration, function (err) {
			//Request de la Conexión.
		    var request = new mssql.Request(connection); 
		    //Ejecución del Store Procedure (SP).
		    request.execute('dbo.RNSP_Periodos', function (err, recordsets, returnValue) {   	
		        //Inicialización del Array Respuesta.  	
		        periodos = new Array(recordsets[0].length);
		        for (var i = 0; i < recordsets[0].length; i++) {
		        	//JSON : Periodo
		        	periodo = new estructuraPeriodo();
		        	periodo.ID = recordsets[0][i].ID;
		        	periodo.fechaInicio = recordsets[0][i].FechaInicio;
		        	periodo.fechaFin = recordsets[0][i].FechaFin;
		        	//Adjuntar el JSON al Array Respuesta.
		        	periodos[i] = periodo;
		        };
		    });   
		});
		//Respuesta (Array : JSON)
		response.json(periodos);
	});
	//Insertar Periodo (server post)
	app.post('/insertarPeriodo', function (request, response) {
		//Parseo de datos del Request.
		var fechaInicio = request.body.fechaInicio;
		var fechaFin = request.body.fechaFin;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros del SP.
		    request.input('FechaInicio', mssql.VarChar(50), fechaInicio);
		    request.input('FechaFin', mssql.VarChar(50), fechaFin);
		    request.execute('dbo.RNSP_InsertarPeriodo', function (err, recordsets, returnValue) {
		    	console.log("Ejecución efectiva del SP (INSERTAR PERIODO)");
				var respuesta = {
					resultado: returnValue
				};
				//Respuesta (JSON): Resultado de la ejecución del SP.	
		    	response.json(respuesta);
		    });  	    
		});		
	});
	//Editar Periodo: Según la Fecha de Inicio (server get).
	app.get('/editarPeriodo/:fechaInicio', function (request, response) {
		//Parámetro del Request.
		var fechaInicio = request.params.fechaInicio;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.input('FechaInicio', mssql.VarChar(50), fechaInicio);
		    request.execute('dbo.RNSP_Periodo', function (err, recordsets, returnValue) { 
		    	var resultado = {
		    		ID: recordsets[0][0].ID,
		    		fechaInicio: recordsets[0][0].FechaInicio,
		    		fechaFin: recordsets[0][0].FechaFin
		    	};
		    	response.json(resultado);	    	
		    });  	    
		});	
	});
	//Actualizar Periodo: Según el ID (server put).
	app.put('/actualizarPeriodo/:ID', function (request, response) {
		var ID = request.params.ID;
		var fechaInicio = request.body.fechaInicio;
		var fechaFin = request.body.fechaFin;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.input('ID', mssql.Int, ID);
		    request.input('FechaInicio', mssql.VarChar(50), fechaInicio);
		    request.input('FechaFin', mssql.VarChar(50), fechaFin);
		    request.execute('dbo.RNSP_ActualizarPeriodo', function (err, recordsets, returnValue) { 
				console.log("Ejecución efectiva del SP (ACTUALIZAR PERIODO)");
				var respuesta = {
					resultado: returnValue
				};		    	
		    	response.json(respuesta);
		    });  	    
		});			    
	});
};