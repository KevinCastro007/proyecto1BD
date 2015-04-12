//Importación del routes
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

var fs = require('fs');
var routePath = __dirname + '/test/';
fs.readdirSync(routePath).forEach(function (file) {
    require(routePath + file)(app, mssql, configuration);
});
//  ------------------------------------ Periodo --------------------------------------------
var periodo = require('./routes/periodo.js')
//Periodos
app.get('/periodos', function (request, response) {
	response.json(periodo.periodos());
});
//Insertar Periodo
app.post('/insertarPeriodo', function (request, response) {
	response.json(periodo.insertar(request.body.fechaInicio, request.body.fechaFin));
});
//Anular Periodo
app.post('/anularPeriodo/:fechaInicio', function (request, response) {
	response.json(periodo.anular(request.params.fechaInicio));	
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
var curso = require('./routes/curso.js')
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
var grupo = require('./routes/grupo.js')
//Grupos
app.get('/grupos', function (request, response) {
	response.json(grupo.grupos());
});
//Insertar Grupo
app.post('/insertarGrupo', function (request, response) {
	response.json(grupo.insertar(request.body.periodo.ID,
		request.body.profesor.ID,
		request.body.curso.ID,   
		request.body.codigo, 
		request.body.cupo));
});
//Editar Grupo
app.get('/editarGrupo/:codigo', function (request, response) {
	var codigo = request.params.codigo;
	var connection = new mssql.Connection(configuration, function (err) {
	    var request = new mssql.Request(connection);
	    //Parámetros
	    request.input('Codigo', mssql.VarChar(50), codigo);
	    //Ejecución del Store Procedure
	    request.execute('dbo.RNSP_Grupo', function (err, recordsets, returnValue) { 
	    	var resultado = {
	    		ID: recordsets[0][0].ID,
	    		periodoID: recordsets[0][0].FK_PeriodoGrupo,
	    		profesorID: recordsets[0][0].FK_ProfesorGrupo,
	    		cursoID: recordsets[0][0].FK_CursoGrupo,
	    		codigo: recordsets[0][0].Codigo,
	    		cupo: recordsets[0][0].Cupo
	    	};
	    	response.json(resultado);	    	
	    });  	    
	});	
});
//Actualizar Grupo
app.put('/actualizarGrupo/:ID', function (request, response) {
	response.json(grupo.actualizar(request.params.ID,
		request.body.periodoID,
		request.body.profesorID,
		request.body.cursoID,
		request.body.codigo,
		request.body.cupo)); 	    
});	

//  ------------------------------------ Miembro --------------------------------------------
var miembro = require('./routes/miembro.js')
//Miembros
app.get('/miembros', function (request, response) {
	response.json(miembro.miembros());
});
//Insertar Miembro
app.post('/insertarMiembro', function (request, response) {
	response.json(miembro.insertar(request.body.grupo.ID, request.body.estudiante.ID));
});
//Retirar Miembro Justificadamente 
app.put('/retirarMiembroJustificamente/:ID', function (request, response) {
	response.json(miembro.retirarJustificamente(request.params.ID)); 	    
});	
//Retirar Miembro Injustificadamente 
app.put('/retirarMiembroInjustificamente/:ID', function (request, response) {
	response.json(miembro.retirarInjustificamente(request.params.ID)); 	    
});	