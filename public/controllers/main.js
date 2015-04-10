// Creación del módulo
var myApp = angular.module('myApp', ['ngRoute']);
// Configuración de las rutas
myApp.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : '../pages/home.html',
			controller 	: 'mainController'
		})
		.when('/periodo', {
			templateUrl : '../pages/periodo.html',
			controller 	: 'periodoController'
		})
		.when('/profesor', {
			templateUrl : '../pages/profesor.html',
			controller 	: 'profesorController'
		})
		.when('/estudiante', {
			templateUrl : '../pages/estudiante.html',
			controller  : 'estudianteController'
		})
		.when('/grupo', {
			templateUrl : '../pages/grupo.html',
			controller 	: 'grupoController'
		})
		.when('/miembro', {
			templateUrl : '../pages/miembro.html',
			controller 	: 'miembroController'
		})
		.otherwise({
			redirectTo : '/'
		});
});
//Controladores
myApp.controller('mainController', ['$scope', '$http', function ($scope, $http) {
	$scope.message = '- Bienvenid@ al servicio web -';

	$scope.salir = function () {
		window.location = ("../index.html"); 
	}

}]);

var ID;
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
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();				
		});
	};	
	$scope.invertirEstado = function (fechaInicio) {
		$http.post('/invertirEstadoPeriodo/' + fechaInicio).success(function (response) {
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();					
		});
	};
	$scope.editar = function (fechaInicio) {
		$http.get('/editarPeriodo/' + fechaInicio).success(function (response) {
			ID = response.ID;
			$scope.periodo = response;
		});
	}
	$scope.actualizar = function () {
		$http.put('/actualizarPeriodo/' + ID, $scope.periodo).success(function (response) {
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();	
		});		
	}	
}]);
myApp.controller('grupoController', ['$scope', '$http', function ($scope, $http) {
	$scope.message = 'Grupo grupo grupo';
}]);
myApp.controller('miembroController', ['$scope', '$http', function ($scope, $http) {
	$scope.message = 'Miembro!';
}]);
myApp.controller('profesorController', ['$scope', '$http', function ($scope, $http) {	
	var refresh = function () {
		$http.get('/profesores').success(function (response) {	//"Importar" desde el server
			$scope.profesores = response;						//"Exportar" desde el controlador
			$scope.profesor = "";
		});	
		
	};
	refresh();
	$scope.insertar = function () {	
		$http.post('/insertarProfesor', $scope.profesor).success(function (response) {
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();	
		});
	};
	$scope.eliminar = function (usuario) {
		$http.delete('/eliminarProfesor/' + usuario).success(function (response) {
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();	
		});
	};
	$scope.editar = function (usuario) {
		$http.get('/editarProfesor/' + usuario).success(function (response) {
			ID = response.ID;
			$scope.profesor = response;
		});
	}
	$scope.actualizar = function () {
		$http.put('/actualizarProfesor/' + ID, $scope.profesor).success(function (response) {
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();	
		});		
	}
}]);
myApp.controller('estudianteController', ['$scope', '$http', function ($scope, $http) {
	var refresh = function () {
		$http.get('/estudiantes').success(function (response) {	//"Importar" desde el server
			$scope.estudiantes = response;						//"Exportar" desde el controlador
			$scope.estudiante = "";
		});	
	};
	refresh();
	$scope.insertar = function () {	
		$http.post('/insertarEstudiante', $scope.estudiante).success(function (response) {
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();	
		});	
	};
	$scope.eliminar = function (carne) {	
		$http.delete('/eliminarEstudiante/' + carne).success(function (response) {
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();	
		});	
	};
	$scope.editar = function (carne) {
		$http.get('/editarEstudiante/' + carne).success(function (response) {
			ID = response.ID;
			$scope.estudiante = response;
		});
	}
	$scope.actualizar = function () {
		$http.put('/actualizarEstudiante/' + ID, $scope.estudiante).success(function (response) {
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();	
		});	
	}
}]);