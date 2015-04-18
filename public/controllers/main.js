// Controladores de las vistas de la página web
var myApp = angular.module('myApp', ['ngRoute']);		//Exportación del módulo.
// Configuración de las rutas (web views) con sus respectivos controladores
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
//Main Controller
myApp.controller('mainController', ['$scope', '$http', function ($scope, $http) {
	$scope.message = '- Bienvenid@ al servicio web -';
	$scope.salir = function () {
		window.location = ("../index.html"); 
	}
}]);
//Periodo Controller
myApp.controller('periodoController', ['$scope', '$http', function ($scope, $http) {
	var refresh = function () {
		$http.get('/periodos').success(function (response) {		//Periodos	
			$scope.periodos = response;								//Server Response
			$scope.periodo = "";
		});			
	};
	refresh();
	$scope.insertar = function () {									//Insertar Periodo
		$http.post('/insertarPeriodo', $scope.periodo).success(function (response) {
			if (response.resultado) {								//Análisis de Server Reponse
				refresh();
				alert("Periodo insertado!");	
				document.location.reload();
			}
			else {
				alert("Imposible insertar Periodo!");					
			}			
		});
	};	
	$scope.editar = function (fechaInicio) {						//Editar Periodo
		$http.get('/editarPeriodo/' + fechaInicio).success(function (response) {
			ID = response.ID;										//Set del ID del Periodo a Actualizar
			$scope.periodo = response;
		});
	}
	$scope.actualizar = function () {								//Actualizar Periodo
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
//Profesor Controller
myApp.controller('profesorController', ['$scope', '$http', function ($scope, $http) {	
	var refresh = function () {
		$http.get('/profesores').success(function (response) {		//Profesores
			$scope.profesores = response;							
			$scope.profesor = "";
		});			
	};
	refresh();
	$scope.insertar = function () {									//Insertar Profesor
		$http.post('/insertarProfesor', $scope.profesor).success(function (response) {
			if (response.resultado) {
				refresh();											//Refresh de la Vista
				alert("Profesor insertado!");	
				document.location.reload();
			}
			else {
				alert("Imposible insertar Profesor!");					
			}
		});
	};
	$scope.eliminar = function (usuario) {							//Eliminar Profesor
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
	$scope.editar = function (usuario) {							//Editar Profesor
		$http.get('/editarProfesor/' + usuario).success(function (response) {
			ID = response.ID;
			$scope.profesor = response;
		});
	}
	$scope.actualizar = function () {								//Actualizar Profesor
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
//Estudiante Controller
myApp.controller('estudianteController', ['$scope', '$http', function ($scope, $http) {
	var refresh = function () {
		$http.get('/estudiantes').success(function (response) {		//Estudiantes
			$scope.estudiantes = response;						
			$scope.estudiante = "";
		});	
	};
	refresh();
	$scope.insertar = function () {									//Insertar Estudiante
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
	$scope.eliminar = function (carne) {							//Eliminar Estudiante
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
	$scope.editar = function (carne) {								//Editar Estudiate
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
//Curso Controller
myApp.controller('cursoController', ['$scope', '$http', function ($scope, $http) {
	var refresh = function () {
		$http.get('/cursos').success(function (response) {			//Cursos
			$scope.cursos = response;						
			$scope.curso = "";
		});			
	};
	refresh();
	$scope.insertar = function () {									//Insertar Curso
		$http.post('/insertarCurso', $scope.curso).success(function (response) {
			if (response.resultado) {
				refresh();
				alert("Curso insertado!");	
				document.location.reload();
			}
			else {
				alert("Imposible insertar Curso!");					
			}
		});
	};	
	$scope.eliminar = function (codigo) {							//Eliminar Curso
		$http.delete('/eliminarCurso/' + codigo).success(function (response) {
			if (response.resultado) {
				refresh();
				alert("Curso eliminado!");	
				document.location.reload();
			}
			else {
				alert("Imposible eliminar Curso!");					
			}
		});
	};
	$scope.editar = function (codigo) {								//Editar Curso
		$http.get('/editarCurso/' + codigo).success(function (response) {
			ID = response.ID;
			$scope.curso = response;
		});
	}
	$scope.actualizar = function () {								//Actualizar Curso
		$http.put('/actualizarCurso/' + ID, $scope.curso).success(function (response) {
			if (response.resultado) {
				refresh();
				alert("Curso actualizado!");	
				document.location.reload();
			}
			else {
				alert("Imposible actulizar Curso!");					
			}
		});		
	}	
}]);
//Grupo Controller
myApp.controller('grupoController', ['$scope', '$http', function ($scope, $http) {
	var refresh = function () {
		$http.get('/grupos').success(function (response) {			//Grupos
			$scope.grupos = response;						
			$scope.grupo = "";
		});			
	};
	refresh();
	$scope.insertar = function () {									//Validaciones de los ComboBox
		if (typeof($scope.grupo.periodo) === 'undefined') {
			alert("Seleccione el Periodo!");
		}
		else if (typeof($scope.grupo.profesor) === 'undefined') {
			alert("Seleccione el Profesor!");
		}
		else if (typeof($scope.grupo.curso) === 'undefined') {
			alert("Seleccione el Curso!");
		}		
		else {														//Insertar Grupo
			$http.post('/insertarGrupo', $scope.grupo).success(function (response) {
				if (response.resultado) {
					refresh();
					alert("Grupo insertado!");	
					document.location.reload();
				}
				else {
					alert("Imposible insertar Grupo!");					
				}
			});			
		}
	};		
	$scope.editar = function (codigo) {								//Editar Grupo
		$http.get('/editarGrupo/' + codigo).success(function (response) {
			ID = response.ID;
			$scope.grupo = response;
		});
	}
	$scope.actualizar = function () {
		if (typeof($scope.grupo.periodo) === 'undefined') {
			alert("Seleccione el Periodo!");
		}
		else if (typeof($scope.grupo.profesor) === 'undefined') {
			alert("Seleccione el Profesor!");
		}
		else if (typeof($scope.grupo.curso) === 'undefined') {
			alert("Seleccione el Curso!");
		}		
		else {														//Actualizar Grupo
			$http.put('/actualizarGrupo/' + ID, $scope.grupo).success(function (response) {
				if (response.resultado) {
					refresh();
					alert("Grupo actualizado!");	
					document.location.reload();
				}
				else {
					alert("Imposible actualizar Grupo!");					
				}
			});			
		}		
	}																//Cargar los ComboBox
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
//Miembro Controller
myApp.controller('miembroController', ['$scope', '$http', function ($scope, $http) {
	var refresh = function () {
		$http.get('/miembros').success(function (response) {		//Miembros
			$scope.miembros = response;						
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
		else {														//Insertar Miembro
			$http.post('/insertarMiembro', $scope.miembro).success(function (response) {
				if (response.resultado) {
					refresh();
					alert("Miembro insertado!");	
					document.location.reload();
				}
				else {
					alert("Imposible insertar Miembro!");					
				}
			});			
		}
	};	
	$scope.retirarJustificamente = function (ID) {					//Retirar Miembro (Justificadamente)
		$http.put('/retirarMiembroJustificamente/' + ID).success(function (response) {
			if (response.resultado) {
				refresh();
				alert("Miembro retirado Justificamente!");	
				document.location.reload();
			}
			else {
				alert("Imposible retirar justificamente Miembro!");					
			}
		});		
	}	
	$scope.retirarInjustificamente = function (ID) {				//Retirar Miembro (Injustificadamente)
		$http.put('/retirarMiembroInjustificamente/' + ID).success(function (response) {
			if (response.resultado) {
				refresh();
				alert("Miembro retirado Injustificamente!");	
				document.location.reload();
			}
			else {
				alert("Imposible retirar Injustificamente Miembro!");					
			}
		});		
	}	
	$http.get('/grupos').success(function (response) {
		$scope.grupos = response;	
	});		
	$http.get('/estudiantes').success(function (response) {
		$scope.estudiantes = response;	
	});		
}]);