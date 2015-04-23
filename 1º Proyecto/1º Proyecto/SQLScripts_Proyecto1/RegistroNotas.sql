/* - Script para la creación de la base de datos RegistroNotas -
	Creación de las tablas correspondientes para dicha base de datos */
CREATE DATABASE RegistroNotas

GO
USE RegistroNotas
GO
CREATE TABLE RN_Periodo
(
	ID INT IDENTITY(1, 1) PRIMARY KEY not null,
	FechaInicio DATE not null,
	FechaFin DATE not null
)
GO 
CREATE TABLE RN_Profesor
(
	ID INT IDENTITY(1, 1) PRIMARY KEY not null,
	Usuario VARCHAR(50) not null,	-- Usuario -- Único
	Clave VARCHAR(50) not null,
	Nombre VARCHAR(50) not null
)
GO
CREATE TABLE RN_Estudiante
(
	ID INT IDENTITY(1, 1) PRIMARY KEY not null,	
	Carne VARCHAR(50) not null,		-- Carné : Único
	Nombre VARCHAR(50) not null,
	Email VARCHAR(50) not null
)
GO
CREATE TABLE RN_TipoEvaluacion 
(
	ID INT IDENTITY(1, 1) PRIMARY KEY not null,
	Nombre VARCHAR(50)  not null	-- Nombre : Único
)
GO
CREATE TABLE RN_Curso
(
	ID INT IDENTITY(1, 1) PRIMARY KEY not null,
	Codigo VARCHAR(50) not null,	-- Código : Único	
	Nombre VARCHAR(50) not null
)
GO
CREATE TABLE RN_Grupo 
(
	ID INT IDENTITY(1, 1) PRIMARY KEY not null,
	FK_PeriodoGrupo INT not null,
	CONSTRAINT FK_PeriodoGrupo FOREIGN KEY(FK_PeriodoGrupo) REFERENCES RN_Periodo(ID),
	FK_ProfesorGrupo INT not null,
	CONSTRAINT FK_ProfesorGrupo FOREIGN KEY(FK_ProfesorGrupo) REFERENCES RN_Profesor(ID),
	FK_CursoGrupo INT not null,
	CONSTRAINT FK_CursoGrupo FOREIGN KEY(FK_CursoGrupo) REFERENCES RN_Curso(ID),
	Codigo VARCHAR(50) not null,	-- Código del Grupo : Único
	Cupo INT not null 				-- Cupo del aula (?)
)
GO
CREATE TABLE RN_Miembro			--EstudianteXGrupo
(
	ID INT IDENTITY(1, 1) PRIMARY KEY not null,
	FK_EstudianteMiembro INT not null,
	CONSTRAINT FK_EstudianteMiembro FOREIGN KEY(FK_EstudianteMiembro) REFERENCES RN_Estudiante(ID),
	FK_GrupoMiembro INT not null,
	CONSTRAINT FK_GrupoMiembro FOREIGN KEY(FK_GrupoMiembro) REFERENCES RN_Grupo(ID),
	Estado VARCHAR(50) not null,	-- Estado en el curso: Activo, Retiro Justificado o Retiro Injustificado
	NotaAcumulada FLOAT not null		-- Se actualiza con cada Instacia de Evaluacion
)
GO
CREATE TABLE RN_Evaluacion			-- TipoEvaluacionXGrupo
(
	ID INT IDENTITY(1, 1) PRIMARY KEY not null,
	FK_GrupoEvaluacion INT not null,
	CONSTRAINT FK_GrupoEvaluacion FOREIGN KEY(FK_GrupoEvaluacion) REFERENCES RN_Grupo(ID),
	FK_TipoEvaluacion INT not null,
	CONSTRAINT FK_TipoEvaluacion FOREIGN KEY(FK_TipoEvaluacion) REFERENCES RN_TipoEvaluacion(ID),
	Porcentaje FLOAT not null,
	TipoInstancia BIT not null, 		-- 1: Fija o 0: Variable
	CantidadInstancia INT not null,  	-- Se predefine en caso de ser tipo Fija
)
GO 
CREATE TABLE RN_InstanciaEvaluacion
(
	ID INT IDENTITY(1, 1) PRIMARY KEY not null,
	FK_Evaluacion INT not null,
	CONSTRAINT FK_Evaluacion FOREIGN KEY(FK_Evaluacion) REFERENCES RN_Evaluacion(ID),
	Valor FLOAT not null,					
	Fecha DATE not null,				
	Descripcion VARCHAR(128) not null
)
GO 
CREATE TABLE RN_EvaluacionMiembro  	-- EvaluacionXEstudiante
(
	ID INT IDENTITY(1, 1) PRIMARY KEY not null,
	FK_InstanciaEvaluacion INT not null,
	CONSTRAINT FK_InstanciaEvaluacion FOREIGN KEY(FK_InstanciaEvaluacion) REFERENCES RN_InstanciaEvaluacion(ID),
	FK_Miembro INT not null,
	CONSTRAINT FK_Miembro FOREIGN KEY(FK_Miembro) REFERENCES RN_Miembro(ID),
	Nota FLOAT not null				-- Nota de la Instancia
)