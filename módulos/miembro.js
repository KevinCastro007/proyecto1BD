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
var miembro;
var miembros;
function estructuraMiembro() {
	var miembro = 
	{		
		estado: "",
		notaAcumulada: 0,
		grupoID: 0,
		estudianteID: 0
	};
	return miembro;
}
function miembros() {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    request.execute('dbo.RNSP_Miembros', function (err, recordsets, returnValue) {    	
	        miembros = new Array(recordsets[0].length);
	        for (var i = 0; i < recordsets[0].length; i++) {
	        	miembro = new estructuraMiembro();
	        	miembro.estado = recordsets[0][i].Estado;
	        	miembro.notaAcumulada = recordsets[0][i].NotaAcumulada;
	        	miembro.grupoID = recordsets[0][i].FK_GrupoMiembro;
	        	miembro.estudianteID = recordsets[0][i].FK_EstudianteMiembro;
	        	miembros[i] = miembro;
	        };
	    });   
	});
	return miembros;
}
function insertar(grupoID, estudianteID) {
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('FK_Grupo', mssql.Int, grupoID);
	    request.input('FK_Estudiante', mssql.Int, estudianteID);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_InsertarMiembro', function (err, recordsets, returnValue) { 	    	
			console.log("Ejecución efectiva del SP (INSERTAR MIEMBRO)");
			var respuesta = {
				resultado: returnValue
			};			
	    	return respuesta;
	    });  	    
	});
}
module.exports.miembros = miembros;
module.exports.insertar = insertar;