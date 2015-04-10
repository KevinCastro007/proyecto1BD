//Importación del módulo para la conexión con MSSQL SERVER
var mssql = require('mssql');
//Configuración de la conexión con la Base de Datos
var configuration = 
{
	user: 'sa',
	password: '123',
	server: 'localhost',
	database: 'RegistroNotas'
}
var periodo;
var periodos;
function estructuraPeriodo() {
	var periodo = 
	{
		ID: 0,
		fechaInicio: "",
		fechaFin: "",
		estado: ""
	};
	return periodo;
}
function periodos() {
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
	        	if (!recordsets[0][i].Estado) {
	        		periodo.estado = "No Anulado";
	        	}
	        	else {
	        		periodo.estado = "Anulado";
	        	}
	        	periodos[i] = periodo;
	        };
	    });   
	});
	return periodos;
}
function insertar(fechaInicio, fechaFin) {
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
	    	return respuesta;
	    });  	    
	});
}
function actualizar(ID, carne, nombre, email) {
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
	    	return respuesta;
	    });  	    
	});
}
function actualizar(ID, fechaInicio, fechaFin) {
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
	    	return respuesta;
	    });  	    
	});
}
function invertirEstado(fechaInicio) {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('FechaInicio', mssql.VarChar(50), fechaInicio);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_InvertirEstadoPeriodo', function (err, recordsets, returnValue) {
			console.log("Ejecución efectiva del SP (INVERTIR ESTADO - PERIODO)");
			var respuesta = {
				resultado: returnValue
			};
	    	return respuesta;
	    });  	    
	});	
}
module.exports.periodos = periodos;
module.exports.insertar = insertar;
module.exports.actualizar = actualizar;
module.exports.invertirEstado = invertirEstado;