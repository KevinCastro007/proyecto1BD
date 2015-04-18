
// Controlador de la aplicación web (Login)
var myApp = angular.module('myApp', []);		//Exportación del módulo.
myApp.controller('AppController', ['$scope', '$http', function ($scope, $http) {	
		//Función de Login.
		$scope.loginProfesor = function () {
			//Server post : Login
			$http.post('/login', $scope.login).success(function (response) {
				//Análisis del resultado (server response).
				if (response.resultado) {
					window.location = ("/main.html");
				}	
				else {
					alert("Ingreso inválido!");
				}
			});	
			$scope.login = "";
		};	
	}
]);