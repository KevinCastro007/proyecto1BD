// Creación del módulo
var myApp = angular.module('myApp', ['ngRoute']);
// Configuración de las rutas
myApp.config(function ($routeProvider) {
	$routeProvider
		.when('/module/:module', {
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
		.when('/curso', {
			templateUrl : '../pages/curso.html',
			controller  : 'cursoController'
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
var ID;
//Controladores
myApp.controller('mainController', ['$scope', '$http', function ($scope, $http) {
	$scope.message = '- Bienvenid@ al servicio web -';
	$scope.salir = function () {
		window.location = ("../index.html"); 
	}
}]);
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
	$scope.anular = function (fechaInicio) {
		$http.post('/anularPeriodo/' + fechaInicio).success(function (response) {
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
	var refresh = function () {
		$http.get('/grupos').success(function (response) {	//"Importar" desde el server
			$scope.grupos = response;						//"Exportar" desde el controlador
			$scope.grupo = "";
		});			
	};
	refresh();
	$scope.insertar = function () {	
		if (typeof($scope.grupo.periodo) === 'undefined') {
			alert("Seleccione el Periodo!");
		}
		else if (typeof($scope.grupo.profesor) === 'undefined') {
			alert("Seleccione el Profesor!");
		}
		else if (typeof($scope.grupo.curso) === 'undefined') {
			alert("Seleccione el Curso!");
		}		
		else {
			$http.post('/insertarGrupo', $scope.grupo).success(function (response) {
				refresh();
				alert("Ejecución efectiva!");
				document.location.reload();	
			});			
		}
	};		
	$scope.editar = function (codigo) {
		$http.get('/editarGrupo/' + codigo).success(function (response) {
			ID = response.ID;
			$scope.grupo = response;
		});
	}
	$scope.actualizar = function () {
		$http.put('/actualizarGrupo/' + ID, $scope.grupo).success(function (response) {
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();	
		});		
	}	
	$http.get('/periodos').success(function (response) {
		$scope.periodos = response;	
	});		
	$http.get('/profesores').success(function (response) {
		$scope.profesores = response;	
	});	
	$http.get('/cursos').success(function (response) {
		$scope.cursos = response;	
	});	
}]);
myApp.controller('miembroController', ['$scope', '$http', function ($scope, $http) {
	var refresh = function () {
		$http.get('/miembros').success(function (response) {	//"Importar" desde el server
			$scope.miembros = response;						//"Exportar" desde el controlador
			$scope.miembro = "";
		});			
	};
	refresh();
	$scope.insertar = function () {	
		if (typeof($scope.miembro.grupo) === 'undefined') {
			alert("Seleccione el Grupo!");
		}
		else if (typeof($scope.miembro.estudiante) === 'undefined') {
			alert("Seleccione el Estudiante!");
		}		
		else {
			$http.post('/insertarMiembro', $scope.miembro).success(function (response) {
				refresh();
				alert("Ejecución efectiva!");
				document.location.reload();	
			});			
		}
	};	
	$scope.retirarJustificamente = function (ID) {
		$http.put('/retirarMiembroJustificamente/' + ID).success(function (response) {
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();	
		});		
	}	
	$scope.retirarInjustificamente = function (ID) {
		$http.put('/retirarMiembroInjustificamente/' + ID).success(function (response) {
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();	
		});		
	}	
	$http.get('/grupos').success(function (response) {
		$scope.grupos = response;	
	});		
	$http.get('/estudiantes').success(function (response) {
		$scope.estudiantes = response;	
	});		
}]);
myApp.controller('cursoController', ['$scope', '$http', function ($scope, $http) {
	var refresh = function () {
		$http.get('/cursos').success(function (response) {	//"Importar" desde el server
			$scope.cursos = response;						//"Exportar" desde el controlador
			$scope.curso = "";
		});			
	};
	refresh();
	$scope.insertar = function () {	
		$http.post('/insertarCurso', $scope.curso).success(function (response) {
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();	
		});
	};	
	$scope.eliminar = function (codigo) {
		$http.delete('/eliminarCurso/' + codigo).success(function (response) {
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();	
		});
	};
	$scope.editar = function (codigo) {
		$http.get('/editarCurso/' + codigo).success(function (response) {
			ID = response.ID;
			$scope.curso = response;
		});
	}
	$scope.actualizar = function () {
		$http.put('/actualizarCurso/' + ID, $scope.curso).success(function (response) {
			refresh();
			alert("Ejecución efectiva!");
			document.location.reload();	
		});		
	}	
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
			if (response.resultado) {
				refresh();
				alert("Profesor insertado!");	
				document.location.reload();
			}
			else {
				alert("Imposible insertar Profesor!");					
			}
		});
	};
	$scope.eliminar = function (usuario) {
		$http.delete('/eliminarProfesor/' + usuario).success(function (response) {
			if (response.resultado) {
				refresh();
				alert("Profesor eliminado!");	
				document.location.reload();
			}
			else {
				alert("Imposible eliminar Profesor!");					
			}
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
			if (response.resultado) {
				refresh();
				alert("Profesor actualizado!");	
				document.location.reload();
			}
			else {
				alert("Imposible actualizar Profesor!");					
			}
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
			if (response.resultado) {
				refresh();
				alert("Estudiante insertado!");	
				document.location.reload();
			}
			else {
				alert("Imposible insertar Estudiante!");					
			}
		});	
	};
	$scope.eliminar = function (carne) {	
		$http.delete('/eliminarEstudiante/' + carne).success(function (response) {
			if (response.resultado) {
				refresh();
				alert("Estudiante eliminado!");	
				document.location.reload();
			}
			else {
				alert("Imposible eliminar Estudiante!");					
			}
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
			if (response.resultado) {
				refresh();
				alert("Estudiante actualizado!");	
				document.location.reload();
			}
			else {
				alert("Imposible actualizar Estudiante!");					
			}
		});	
	}
}]);