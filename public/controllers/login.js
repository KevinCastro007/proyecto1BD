
// Controlador de la aplicación web
var myApp = angular.module('myApp', []);
myApp.controller('AppController', ['$scope', '$http', function ($scope, $http) {		
		$scope.loginProfesor = function () {
			$http.post('/login', $scope.login).success(function (response) {
				console.log($scope.login);
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