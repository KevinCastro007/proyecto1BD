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

//  -------------------------------------- Estudiante --------------------------------------
var estudiante = require('./módulos/estudiante.js');
//Estudiantes
app.get('/estudiantes', function (request, response) {
	response.json(estudiante.estudiantes());
});
//Insertar Estudiante
app.post('/insertarEstudiante', function (request, response) {
	response.json(estudiante.insertar(request.body.carne, 
		request.body.nombre, 
		request.body.email));
});
//Eliminar Estudiante
app.delete('/eliminarEstudiante/:carne', function (request, response) {
	response.json(estudiante.eliminar(request.params.carne));	
});
//Editar Estudiante
app.get('/editarEstudiante/:carne', function (request, response) {
	var carne = request.params.carne;
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('Carne', mssql.VarChar(50), carne);
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
	response.json(estudiante.actualizar(request.params.ID, 
		request.body.carne,
		request.body.nombre,
		request.body.email));
});

//  -------------------------------- Profesor --------------------------------------
var profesor = require('./módulos/profesor.js');
//Profesores
app.get('/profesores', function (request, response) {
	response.json(profesor.profesores());
});
//Insertar Profesor
app.post('/insertarProfesor', function (request, response) {
	response.json(profesor.insertar(request.body.usuario,
		request.body.clave,
		request.body.nombre));	
});
//Eliminar Profesor
app.delete('/eliminarProfesor/:usuario', function (request, response) {
	response.json(profesor.eliminar(request.params.usuario));	
});
//Editar Profesor
app.get('/editarProfesor/:usuario', function (request, response) {
	var usuario = request.params.usuario;
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('Usuario', mssql.VarChar(50), usuario);
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
	response.json(profesor.actualizar(request.params.ID,
		request.body.usuario,
		request.body.clave,
		request.body.nombre)); 	    
});	
//Login Profesor
app.post('/login', function (request, response) {
	var usuario = request.body.usuario;	
	var clave = request.body.clave;			
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('Usuario', mssql.VarChar(50), usuario);
	    request.input('Clave', mssql.VarChar(50), clave);
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

//  ------------------------------------ Periodo --------------------------------------------
var periodo = require('./módulos/periodo.js')
//Periodos
app.get('/periodos', function (request, response) {
	response.json(periodo.periodos());
});
//Insertar Periodo
app.post('/insertarPeriodo', function (request, response) {
	response.json(periodo.insertar(request.body.fechaInicio, request.body.fechaFin));
});
//Anular Periodo
app.post('/invertirEstadoPeriodo/:fechaInicio', function (request, response) {
	response.json(periodo.invertirEstado(request.params.fechaInicio));	
});
//Editar Periodo
app.get('/editarPeriodo/:fechaInicio', function (request, response) {
	var fechaInicio = request.params.fechaInicio;
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('FechaInicio', mssql.VarChar(50), fechaInicio);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_Periodo', function (err, recordsets, returnValue) { 
	    	var resultado = {
	    		ID: recordsets[0][0].ID,
	    		fechaInicio: recordsets[0][0].FechaInicio,
	    		fechaFin: recordsets[0][0].FechaFin
	    	};
	    	response.json(resultado);	    	
	    });  	    
	});	
});
//Actualizar Periodo
app.put('/actualizarPeriodo/:ID', function (request, response) {
	response.json(periodo.actualizar(request.params.ID,
		request.body.fechaInicio,
		request.body.fechaFin)); 	    
});	

//  ------------------------------------ Curso --------------------------------------------
var curso = require('./módulos/curso.js')
//Cursos
app.get('/cursos', function (request, response) {
	response.json(curso.cursos());
});
//Insertar Curso
app.post('/insertarCurso', function (request, response) {
	response.json(curso.insertar(request.body.codigo, request.body.nombre));
});
//Eliminar Curso
app.delete('/eliminarCurso/:codigo', function (request, response) {
	response.json(curso.eliminar(request.params.codigo));	
});
//Editar Curso
app.get('/editarCurso/:codigo', function (request, response) {
	var codigo = request.params.codigo;
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('Codigo', mssql.VarChar(50), codigo);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_Curso', function (err, recordsets, returnValue) { 
	    	var resultado = {
	    		ID: recordsets[0][0].ID,
	    		codigo: recordsets[0][0].Codigo,
	    		nombre: recordsets[0][0].Nombre
	    	};
	    	response.json(resultado);	    	
	    });  	    
	});	
});
//Actualizar Curso
app.put('/actualizarCurso/:ID', function (request, response) {
	response.json(curso.actualizar(request.params.ID,
		request.body.codigo,
		request.body.nombre)); 	    
});

//  ------------------------------------ Grupo --------------------------------------------
var grupo = require('./módulos/grupo.js')
//Grupos
app.get('/grupos', function (request, response) {
	response.json(grupo.grupos());
});
//Insertar Grupo
app.post('/insertarGrupo', function (request, response) {
	response.json(grupo.insertar(request.body.periodoID,
		request.body.profesorID,
		request.body.cursoID,   
		request.body.codigo, 
		request.body.cupo));
});

//  ------------------------------------ Miembro --------------------------------------------
var miembro = require('./módulos/miembro.js')
//Miembros
app.get('/miembros', function (request, response) {
	response.json(miembro.miembros());
});
//Insertar Miembro
app.post('/insertarMiembro', function (request, response) {
	response.json(miembro.insertar(request.body.grupoID, request.body.estudianteID));
});