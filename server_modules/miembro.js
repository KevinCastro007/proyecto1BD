var miembro;
var miembros;
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
module.exports = function (app, mssql, configuration) {
	//Miembros
	app.get('/miembros', function (request, response) {
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    request.execute('dbo.RNSP_Miembros', function (err, recordsets, returnValue) {    	
		        miembros = new Array(recordsets[0].length);
		        for (var i = 0; i < recordsets[0].length; i++) {
		        	miembro = new estructuraMiembro();
		        	miembro.ID = recordsets[0][i].ID;
		        	miembro.estado = recordsets[0][i].Estado;
		        	miembro.notaAcumulada = recordsets[0][i].NotaAcumulada;
		        	miembro.grupoID = recordsets[0][i].Grupo;
		        	miembro.estudianteID = recordsets[0][i].Estudiante;
		        	miembros[i] = miembro;
		        };
		    });   
		});		
		response.json(miembros);
	});
	//Insertar Miembro
	app.post('/insertarMiembro', function (request, response) {
		var grupoID = request.body.grupo.ID;
		var estudianteID = request.body.estudiante.ID;
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
		    	response.json(respuesta);
		    });  	    
		});		
	});
	//Retirar Miembro Justificadamente 
	app.put('/retirarMiembroJustificamente/:ID', function (request, response) {
		var ID = request.params.ID;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros
		    request.input('ID', mssql.Int, ID);
		    //Ejecución del Store Procedure
		    request.execute('dbo.RNSP_RetirarMiembroJustificadamente', function (err, recordsets, returnValue) { 	    	
				console.log("Ejecución efectiva del SP (RETIRAR MIEMBRO JUSTIFICADAMENTE)");
				var respuesta = {
					resultado: returnValue
				};			
		    	response.json(respuesta);
		    });  	    
		});			    
	});	
	//Retirar Miembro Injustificadamente 
	app.put('/retirarMiembroInjustificamente/:ID', function (request, response) {
		var ID = request.params.ID;
		var connection = new mssql.Connection(configuration, function (err) {
		    var request = new mssql.Request(connection);
		    //Parámetros
		    request.input('ID', mssql.Int, ID);
		    //Ejecución del Store Procedure
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