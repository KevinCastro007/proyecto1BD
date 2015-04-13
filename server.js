//Importación de los módulos para el servidor
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

//Configuración de la Base de Datos
var configuration = 
{
	user: 'sa',
	password: '123',
	server: 'localhost',
	database: 'RegistroNotas'
}

//Importación de los módulos del servidor
var fs = require('fs');
var routePath = __dirname + '/server_modules/';
fs.readdirSync(routePath).forEach(function (file) {
    require(routePath + file)(app, mssql, configuration);
});

//Servidor en listening
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});