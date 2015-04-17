var periodo;
var periodos;
function estructuraPeriodo() {
	var periodo = 
	{
		ID: 0,
		fechaInicio: "",
		fechaFin: ""
	};
	return periodo;
}
module.exports = function (app, mssql, configuration) {
	//Periodos
	app.get('/periodos', function (request, response) {
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection); 
		    //Ejecución del Store Procedure
		    request.execute('dbo.RNSP_Periodos', function (err, recordsets, returnValue) { 
		        periodos = new Array(recordsets[0].length);
		        for (var i = 0; i < recordsets[0].length; i++) {
		        	periodo = new estructuraPeriodo();
		        	periodo.ID = recordsets[0][i].ID;
		        	periodo.fechaInicio = recordsets[0][i].FechaInicio;
		        	periodo.fechaFin = recordsets[0][i].FechaFin;
		        	periodos[i] = periodo;
		        };
		    });   
		});
		response.json(periodos);
	});
	//Insertar Periodo
	app.post('/insertarPeriodo', function (request, response) {
		var fechaInicio = request.body.fechaInicio;
		var fechaFin = request.body.fechaFin;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros
		    request.input('FechaInicio', mssql.VarChar(50), fechaInicio);
		    request.input('FechaFin', mssql.VarChar(50), fechaFin);
		    //Ejecución del Store Procedure
		    request.execute('dbo.RNSP_InsertarPeriodo', function (err, recordsets, returnValue) {
		    	console.log("Ejecución efectiva del SP (INSERTAR PERIODO)");
				var respuesta = {
					resultado: returnValue
				};
		    	response.json(respuesta);
		    });  	    
		});		
	});
	//Editar Periodo
	app.get('/editarPeriodo/:fechaInicio', function (request, response) {
		var fechaInicio = request.params.fechaInicio;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros
		    request.input('FechaInicio', mssql.VarChar(50), fechaInicio);
		    //Ejecución del Store Procedure
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
	//Actualizar Periodo
	app.put('/actualizarPeriodo/:ID', function (request, response) {
		var ID = request.params.ID;
		var fechaInicio = request.body.fechaInicio;
		var fechaFin = request.body.fechaFin;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros
		    request.input('ID', mssql.Int, ID);
		    request.input('FechaInicio', mssql.VarChar(50), fechaInicio);
		    request.input('FechaFin', mssql.VarChar(50), fechaFin);
		    //Ejecución del Store Procedure
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