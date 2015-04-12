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
var curso;
var cursos;
function estructuraCurso() {
	var curso = 
	{		
		ID: 0,
		codigo: "",
		nombre: ""
	};
	return curso;
}
function cursos() {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    request.execute('dbo.RNSP_Cursos', function (err, recordsets, returnValue) {    	
	        cursos = new Array(recordsets[0].length);
	        for (var i = 0; i < recordsets[0].length; i++) {
	        	curso = new estructuraCurso();
	        	curso.ID = recordsets[0][i].ID;
	        	curso.codigo = recordsets[0][i].Codigo;
	        	curso.nombre = recordsets[0][i].Nombre;
	        	cursos[i] = curso;
	        };
	    });   
	});
	return cursos;
}
function insertar(codigo, nombre) {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('Codigo', mssql.VarChar(50), codigo);
	    request.input('Nombre', mssql.VarChar(50), nombre);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_InsertarCurso', function (err, recordsets, returnValue) { 	    	
			console.log("Ejecución efectiva del SP (INSERTAR CURSO)");
			var respuesta = {
				resultado: returnValue
			};			
	    	return respuesta;
	    });  	    
	});
}
function eliminar(codigo) {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetro
	    request.input('Codigo', mssql.VarChar(50), codigo);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_EliminarCurso', function (err, recordsets, returnValue) {	    	
			console.log("Ejecución efectiva del SP (ELIMINAR CURSO)"); 
			var respuesta = {
				resultado: returnValue
			};			
	    	return respuesta;
	    });  	    
	});
}
function actualizar(ID, codigo, nombre) {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('ID', mssql.Int, ID);	    
	    request.input('Codigo', mssql.VarChar(50), codigo);
	    request.input('Nombre', mssql.VarChar(50), nombre);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_ActualizarCurso', function (err, recordsets, returnValue) { 
			console.log("Ejecución efectiva del SP (ACTUALIZAR CURSO)");
			var respuesta = {
				resultado: returnValue
			};
	    	return respuesta;
	    }); 
	}); 
}
module.exports.cursos = cursos;
module.exports.insertar = insertar;
module.exports.eliminar = eliminar;
module.exports.actualizar = actualizar;
