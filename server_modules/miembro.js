//Variables en el contexto.
var miembro;
var miembros;
//Función que retorna un JSON con la estructura de un Miembro 
//con respecto a la BD y la Vista correspondiente.
function estructuraMiembro() {
	var miembro = 
	{
		ID: 0,		
		estado: "",
		notaAcumulada: 0,
		grupoID: 0,
		estudianteID: 0
	};
	return miembro;
}
//Exportación del módulo correspondiente para los Miembros.
//Parámetros desde el Servidor: app, mssql y configuration.
module.exports = function (app, mssql, configuration) {
	//Miembros (server get)
	app.get('/miembros', function (request, response) {
		//Conexión a la BD según: configuration.
		var connection = new mssql.Connection(configuration, function (err) {
			//Request de la Conexión.
		    var request = new mssql.Request(connection);
		    //Ejecución del Store Procedure (SP).
		    request.execute('dbo.RNSP_Miembros', function (err, recordsets, returnValue) {     	
		        //Inicialización del Array Respuesta.  	
		        miembros = new Array(recordsets[0].length);
		        for (var i = 0; i < recordsets[0].length; i++) {
		        	//JSON : Miembro
		        	miembro = new estructuraMiembro();
		        	miembro.ID = recordsets[0][i].ID;
		        	miembro.estado = recordsets[0][i].Estado;
		        	miembro.notaAcumulada = recordsets[0][i].NotaAcumulada;
		        	miembro.grupoID = recordsets[0][i].Grupo;
		        	miembro.estudianteID = recordsets[0][i].Estudiante;
		        	//Adjuntar el JSON al Array Respuesta.
		        	miembros[i] = miembro;
		        };
		    });   
		});		
		//Respuesta (Array : JSON)
		response.json(miembros);
	});
	//Insertar Miembro (server post).
	app.post('/insertarMiembro', function (request, response) {
		//Parseo de datos del Request.
		var grupoID = request.body.grupo.ID;
		var estudianteID = request.body.estudiante.ID;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros del SP.
		    request.input('FK_Grupo', mssql.Int, grupoID);
		    request.input('FK_Estudiante', mssql.Int, estudianteID);
		    request.execute('dbo.RNSP_InsertarMiembro', function (err, recordsets, returnValue) { 	    	
				console.log("Ejecución efectiva del SP (INSERTAR MIEMBRO)");
				var respuesta = {
					resultado: returnValue
				};		
				//Respuesta (JSON): Resultado de la ejecución del SP.	
		    	response.json(respuesta);
		    });  	    
		});		
	});
	//Retirar Miembro Justificadamente: Según el ID (server put). 
	app.put('/retirarMiembroJustificamente/:ID', function (request, response) {
		//Parámetro del Request.
		var ID = request.params.ID;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.input('ID', mssql.Int, ID);
		    request.execute('dbo.RNSP_RetirarMiembroJustificadamente', function (err, recordsets, returnValue) { 	    	
				console.log("Ejecución efectiva del SP (RETIRAR MIEMBRO JUSTIFICADAMENTE)");
				var respuesta = {
					resultado: returnValue
				};			
		    	response.json(respuesta);
		    });  	    
		});			    
	});	
	//Retirar Miembro Injustificadamente: Según el ID (server put).
	app.put('/retirarMiembroInjustificamente/:ID', function (request, response) {
		var ID = request.params.ID;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.input('ID', mssql.Int, ID);
		    request.execute('dbo.RNSP_RetirarMiembroInjustificadamente', function (err, recordsets, returnValue) { 	    	
				console.log("Ejecución efectiva del SP (RETIRAR MIEMBRO INJUSTIFICADAMENTE)");
				var respuesta = {
					resultado: returnValue
				};			
		    	response.json(respuesta);
		    });  	    
		});			    
	});		
};