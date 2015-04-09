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

var estudiante;
var estudiantes;
function estructuraEstudiante() {
	var estudiante = 
	{		
		carne: "",
		nombre: "",
		email: ""
	};
	return estudiante;
}

function estudiantes() {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    request.execute('dbo.RNSP_Estudiantes', function (err, recordsets, returnValue) {    	
	        estudiantes = new Array(recordsets[0].length);
	        for (var i = 0; i < recordsets[0].length; i++) {
	        	estudiante = new estructuraEstudiante();
	        	estudiante.carne = recordsets[0][i].Carne;
	        	estudiante.nombre = recordsets[0][i].Nombre;
	        	estudiante.email = recordsets[0][i].Email;
	        	estudiantes[i] = estudiante;
	        };
	    });   
	});
	return estudiantes;	
}

function insertarEstudiante(carne, nombre, email) {	
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('Carne', mssql.VarChar(32), carne);
	    request.input('Nombre', mssql.VarChar(32), nombre);
	    request.input('Email', mssql.VarChar(32), email);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_InsertarEstudiante', function (err, recordsets, returnValue) {
	    	var respuesta = {
				resultado: returnValue
			};
	    	return respuesta;
	    });  	    
	});
}

function eliminarEstudiante(carne) {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetro
	    request.input('Carne', mssql.VarChar(32), carne);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_EliminarEstudiante', function (err, recordsets, returnValue) { 
	 	    return returnValue;
	    });  	    
	});	
}

function actualizarEstudiante(ID, carne, nombre, email) {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('ID', mssql.Int, ID);
	    request.input('Carne', mssql.VarChar(32), carne);
	    request.input('Nombre', mssql.VarChar(32), nombre);
	    request.input('Email', mssql.VarChar(32), email);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_ActualizarEstudiante', function (err, recordsets, returnValue) { 
	    	return returnValue;
	    });  	    
	});
}

module.exports.estudiantes = estudiantes;
module.exports.insertarEstudiante = insertarEstudiante;
module.exports.eliminarEstudiante = eliminarEstudiante;
module.exports.actualizarEstudiante = actualizarEstudiante;