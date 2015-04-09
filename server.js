//Importación del módulos
var express = require('express');
var http = require('http');
var mssql = require('mssql');
var bodyParser = require('body-parser');
//Creación del servidor y configuración
var app = express();
var server = http.createServer(app);
app.set('port', process.env.PORT || 8080);			
app.use(express.static(__dirname + '/public'));		
app.use(bodyParser.json());		
//Servidor en listening
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
//Configuración de la Base de Datos
var configuration = 
{
	user: 'sa',
	password: '123',
	server: 'localhost',
	database: 'RegistroNotas'
}

//  ----------------------- Estudiante --------------------------------------
var estudiante = require('./estudiante.js');
//Estudiantes
app.get('/estudiantes', function (request, response) {
	response.json(estudiante.estudiantes());
});
//Insertar Estudiante
app.post('/insertarEstudiante', function (request, response) {
	var respuesta = {
		resultado: estudiante.insertarEstudiante(request.body.carne, 
			request.body.nombre, 
			request.body.email)
	};
	console.log("Ejecución efectiva del SP (INSERTAR ESTUDIANTE)");
	response.json(respuesta);
});
//Eliminar Estudiante
app.delete('/eliminarEstudiante/:carne', function (request, response) {
	var respuesta = {
		resultado: estudiante.eliminarEstudiante(request.params.carne)
	};    	
	console.log("Ejecución efectiva del SP (ELIMINAR ESTUDIANTE)");
	response.json(respuesta);	
});
//Editar Estudiante
app.get('/editarEstudiante/:carne', function (request, response) {
	var carne = request.params.carne;
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('Carne', mssql.VarChar(32), carne);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_Estudiante', function (err, recordsets, returnValue) { 
	    	var resultado = {
	    		ID: recordsets[0][0].ID,
	    		carne: recordsets[0][0].Carne,
	    		nombre: recordsets[0][0].Nombre,
	    		email: recordsets[0][0].Email
	    	};
	    	response.json(resultado);	    	
	    });  	    
	});	
});
//Actualizar Estudiante
app.put('/actualizarEstudiante/:ID', function (request, response) {
	var respuesta = {
		resultado: estudiante.actualizarEstudiante(request.params.ID,
			request.body.carne,
			request.body.nombre,
			request.body.email)
	};	    	
	console.log("Ejecución efectiva del SP (ACTUALIZAR ESTUDIANTE)");
	response.json(respuesta);
});

//  ----------------------- Profesor --------------------------------------
var profesor = require('./profesor.js');
//Profesores
app.get('/profesores', function (request, response) {
	response.json(profesor.profesores());
});
//Insertar Profesor
app.post('/insertarProfesor', function (request, response) {
	var respuesta = {
		resultado: profesor.insertarProfesor(request.body.usuario,
			request.body.clave,
			request.body.nombre)
	};
	console.log("Ejecución efectiva del SP (INSERTAR PROFESOR)");
	response.json(respuesta);	
});
//Eliminar Profesor
app.delete('/eliminarProfesor/:usuario', function (request, response) {
	var respuesta = {
		resultado: profesor.eliminarProfesor(request.params.usuario)
	};	    	
	console.log("Ejecución efectiva del SP (ELIMINAR PROFESOR)");
	response.json(respuesta);	
});
//Editar Profesor
app.get('/editarProfesor/:usuario', function (request, response) {
	var usuario = request.params.usuario;
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('Usuario', mssql.VarChar(32), usuario);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_Profesor', function (err, recordsets, returnValue) { 
	    	var resultado = {
	    		ID: recordsets[0][0].ID,
	    		usuario: recordsets[0][0].Usuario,
	    		clave: recordsets[0][0].Clave,
	    		nombre: recordsets[0][0].Nombre
	    	};
	    	response.json(resultado);	    	
	    });  	    
	});	
});
//Actualizar Profesor
app.put('/actualizarProfesor/:ID', function (request, response) {
	var respuesta = {
		resultado: profesor.actualizarProfesor(request.params.ID,
			request.body.usuario,
			request.body.clave,
			request.body.nombre)
	};
	console.log("Ejecución efectiva del SP (ACTUALIZAR PROFESOR)");
	response.json(respuesta);	 	    
});	
//Login Profesor
app.post('/login', function (request, response) {
	var usuario = request.body.usuario;	
	var clave = request.body.clave;			
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('Usuario', mssql.VarChar(32), usuario);
	    request.input('Clave', mssql.VarChar(32), clave);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_IdentificarProfesor', function (err, recordsets, returnValue) { 
	    	var respuesta = {
	    		resultado: returnValue
	    	};
	    	console.log("Ejecución efectiva del SP (LOGIN)");
	    	response.json(respuesta);
	    });  
	});	
});

//  ----------------------- Periodo --------------------------------------
var periodo = require('./periodo.js')
//Periodos
app.get('/periodos', function (request, response) {
	response.json(periodo.periodos());
});