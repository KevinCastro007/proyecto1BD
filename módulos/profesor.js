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
		ID: 0,
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
	        	profesor.ID = recordsets[0][i].ID;
	        	profesor.usuario = recordsets[0][i].Usuario;
	        	profesor.nombre = recordsets[0][i].Nombre;
	        	profesores[i] = profesor;
	        };
	    });   
	});
	return profesores;
}

function insertar(usuario, clave, nombre) {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('Usuario', mssql.VarChar(50), usuario);
	    request.input('Clave', mssql.VarChar(50), clave);
	    request.input('Nombre', mssql.VarChar(50), nombre);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_InsertarProfesor', function (err, recordsets, returnValue) { 	    	
			console.log("Ejecución efectiva del SP (INSERTAR PROFESOR)");
			var respuesta = {
				resultado: returnValue
			};			
	    	return respuesta;
	    });  	    
	});
}

function eliminar(usuario) {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetro
	    request.input('Usuario', mssql.VarChar(50), usuario);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_EliminarProfesor', function (err, recordsets, returnValue) {	    	
			console.log("Ejecución efectiva del SP (ELIMINAR PROFESOR)"); 
			var respuesta = {
				resultado: returnValue
			};			
	    	return respuesta;
	    });  	    
	});
}

function actualizar(ID, usuario, clave, nombre) {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('ID', mssql.Int, ID);	    
	    request.input('Usuario', mssql.VarChar(50), usuario);
	    request.input('Clave', mssql.VarChar(50), clave);
	    request.input('Nombre', mssql.VarChar(50), nombre);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_ActualizarProfesor', function (err, recordsets, returnValue) { 
			console.log("Ejecución efectiva del SP (ACTUALIZAR PROFESOR)");
			var respuesta = {
				resultado: returnValue
			};
	    	return respuesta;
	    }); 
	}); 
}

module.exports.profesores = profesores;
module.exports.insertar = insertar;
module.exports.eliminar = eliminar;
module.exports.actualizar = actualizar;