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

var profesor;
var profesores;
function estructuraProfesor() {
	var profesor = 
	{		
		usuario: "",
		nombre: ""
	};
	return profesor;
}

function profesores() {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    request.execute('dbo.RNSP_Profesores', function (err, recordsets, returnValue) {    	
	        profesores = new Array(recordsets[0].length);
	        for (var i = 0; i < recordsets[0].length; i++) {
	        	profesor = new estructuraProfesor();
	        	profesor.usuario = recordsets[0][i].Usuario;
	        	profesor.nombre = recordsets[0][i].Nombre;
	        	profesores[i] = profesor;
	        };
	    });   
	});
	return profesores;
}

function insertarProfesor(usuario, clave, nombre) {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('Usuario', mssql.VarChar(32), usuario);
	    request.input('Clave', mssql.VarChar(32), clave);
	    request.input('Nombre', mssql.VarChar(32), nombre);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_InsertarProfesor', function (err, recordsets, returnValue) { 
	    	return returnValue;
	    });  	    
	});
}

function eliminarProfesor(usuario) {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetro
	    request.input('Usuario', mssql.VarChar(32), usuario);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_EliminarProfesor', function (err, recordsets, returnValue) { 
	    	return returnValue;
	    });  	    
	});
}

function actualizarProfesor(ID, usuario, clave, nombre) {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('ID', mssql.Int, ID);	    
	    request.input('Usuario', mssql.VarChar(32), usuario);
	    request.input('Clave', mssql.VarChar(32), clave);
	    request.input('Nombre', mssql.VarChar(32), nombre);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_ActualizarProfesor', function (err, recordsets, returnValue) { 
	    	return returnValue;
	    }); 
	}); 
}

module.exports.profesores = profesores;
module.exports.insertarProfesor = insertarProfesor;
module.exports.eliminarProfesor = eliminarProfesor;
module.exports.actualizarProfesor = actualizarProfesor;