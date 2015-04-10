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

function insertar(carne, nombre, email) {	
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
	    	return respuesta;
	    });  	    
	});
}

function eliminar(carne) {
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

module.exports.estudiantes = estudiantes;
module.exports.insertar = insertar;
module.exports.eliminar = eliminar;
module.exports.actualizar = actualizar;