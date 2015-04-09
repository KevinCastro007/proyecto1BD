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
		fechaInicio: "",
		fechaFin: ""
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
	        	periodo.fechaInicio = recordsets[0][i].FechaInicio;
	        	periodo.fechaFin = recordsets[0][i].FechaFin;
	        	periodos[i] = periodo;
	        };
	    });   
	});
	return periodos;
}

function insertarPeriodo(fechaInicio, fechaFin) {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('FechaInicio', mssql.VarChar(32), fechaInicio);
	    request.input('FechaFin', mssql.VarChar(32), fechaFin);
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

module.exports.periodos = periodos;
module.exports.insertarPeriodo = insertarPeriodo;