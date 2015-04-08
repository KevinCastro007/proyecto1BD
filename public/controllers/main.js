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
		.when('/grupo', {
			templateUrl : '../pages/grupo.html',
			controller 	: 'grupoController'
		})
		.when('/profesor', {
			templateUrl : '../pages/profesor.html',
			controller 	: 'profesorController'
		})
		.when('/estudiante', {
			templateUrl : '../pages/estudiante.html',
			controller  : 'estudianteController'
		})
		.otherwise({
			redirectTo : '/'
		});
});

myApp.controller('mainController', ['$scope', '$http', function ($scope, $http) {
	$scope.message = '- Bienvenid@ al servicio web -';

	$scope.salir = function () {
		window.location = ("../index.html"); 
	}

}]);

myApp.controller('periodoController', ['$scope', '$http', function ($scope, $http) {
	var refresh = function () {
		$http.get('/periodos').success(function (response) {	//"Importar" desde el server
			$scope.periodos = response;						//"Exportar" desde el controlador
			$scope.periodo = "";
		});	
		
	};
	refresh();
}]);

myApp.controller('grupoController', ['$scope', '$http', function ($scope, $http) {
	$scope.message = 'Grupo grupo grupo';
}]);

var ID;
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
			// if (response.resultado) {
			// 	alert("Profesor insertado correctamente!");
			// 	document.location.reload();	
			// }	
			// else {
			// 	alert("No se ha podido insertar el Profesor!");
			// }
		});
	};

	$scope.eliminar = function (usuario) {
		$http.delete('/eliminarProfesor/' + usuario).success(function (response) {
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();	
			// if (response.resultado) {
			// 	alert("Profesor eliminado correctamente!");
			// 	document.location.reload();	
			// }	
			// else {
			// 	alert("No se ha podido eliminar el Profesor!");
			// }
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
			// if (response.resultado) {
			// 	alert("Profesor actualizado correctamente!");
			// 	document.location.reload();	
			// }	
			// else {
			// 	alert("No se ha podido actualizar el Profesor!");
			// }
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
			// if (response) {
			// 	alert("Estudiante insertado correctamente!");
			// 	document.location.reload();	
			// }	
			// else {
			// 	alert("No se ha podido insertar el Estudiante!");
			// }
		});	
	};

	$scope.eliminar = function (carne) {	
		$http.delete('/eliminarEstudiante/' + carne).success(function (response) {
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();	
			// if (response.resultado) {
			// 	alert("Estudiante eliminado correctamente!");
			// 	document.location.reload();	
			// }	
			// else {
			// 	alert("No se ha podido eliminar el Estudiante!");
			// }
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
			// if (response.resultado) {
			// 	alert("Estudiante actualizado correctamente!");
			// 	document.location.reload();
			// }	
			// else {
			// 	alert("No se ha podido actualizar el Estudiante!");
			// }
		});	
	}
}]);