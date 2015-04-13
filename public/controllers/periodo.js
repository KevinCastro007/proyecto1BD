// Creación del módulo
var myApp = angular.module('periodoController', ['ngRoute']);
myApp.controller('periodoController', ['$scope', '$http', function ($scope, $http) {
	var refresh = function () {
		$http.get('/periodos').success(function (response) {	//"Importar" desde el server
			$scope.periodos = response;							//"Exportar" desde el controlador
			$scope.periodo = "";
		});			
	};
	refresh();
	$scope.insertar = function () {	
		$http.post('/insertarPeriodo', $scope.periodo).success(function (response) {
			if (response.resultado) {
				refresh();
				alert("Periodo insertado!");	
				document.location.reload();
			}
			else {
				alert("Imposible insertar Periodo!");					
			}			
		});
	};	
	/*$scope.anular = function (fechaInicio) {
		$http.post('/anularPeriodo/' + fechaInicio).success(function (response) {
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();					
		});
	};*/
	$scope.editar = function (fechaInicio) {
		$http.get('/editarPeriodo/' + fechaInicio).success(function (response) {
			ID = response.ID;
			$scope.periodo = response;
		});
	}
	$scope.actualizar = function () {
		$http.put('/actualizarPeriodo/' + ID, $scope.periodo).success(function (response) {
			if (response.resultado) {
				refresh();
				alert("Periodo actualizado!");	
				document.location.reload();
			}
			else {
				alert("Imposible actualizar Periodo!");					
			}
		});		
	}	
}]);