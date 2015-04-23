/* Procedimientos Almacenados asociadas a los Grupos */

USE RegistroNotas

GO
-- Procedmiento para obtener todos los valores de los Grupos registrados.
CREATE PROCEDURE RNSP_Grupos
AS
BEGIN
	BEGIN TRY
		SELECT G.ID, G.FK_PeriodoGrupo, P.Nombre AS Profesor, C.Nombre AS Curso, G.Codigo, G.Cupo FROM dbo.RN_Grupo G
			inner join dbo.RN_Profesor P ON P.ID =  G.FK_ProfesorGrupo
			inner join dbo.RN_Curso C ON C.ID = G.FK_CursoGrupo
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedmiento para obtener todos los valores de los Grupos relacionados
-- con un Profesor con un Nombre de Usuario como parámetro.
CREATE PROCEDURE RNSP_GruposProfesor(@Usuario VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		SELECT G.Codigo FROM dbo.RN_Grupo G
			inner join dbo.RN_Profesor P ON P.ID = G.FK_ProfesorGrupo
			WHERE P.Usuario = @Usuario
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedmiento para obtener los valores de un Grupo con un Código como parámetro.
CREATE PROCEDURE RNSP_Grupo(@Codigo VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		IF (dbo.RNF_ExisteGrupo(@Codigo) = 1)			-- Validación alguna existencia previa del Grupo (FN).
		BEGIN
			SELECT G.ID, G.FK_PeriodoGrupo, G.FK_ProfesorGrupo, G.FK_CursoGrupo, G.Codigo, G.Cupo FROM dbo.RN_Grupo G		
				WHERE G.Codigo = @Codigo	
			RETURN 1
		END
		ELSE
			RETURN 0
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedimiento para insertar un Grupo.
CREATE PROCEDURE RNSP_InsertarGrupo(@FK_Periodo INT, @FK_Profesor INT, @FK_Curso INT, @Codigo VARCHAR(50), @Cupo INT)
AS
BEGIN
	BEGIN TRY
		IF (dbo.RNF_ExisteGrupo(@Codigo) = 0)		-- Validación alguna existencia previa del Grupo (FN).
		BEGIN
			IF (dbo.RNF_ExistePeriodoID(@FK_Periodo) = 0 or 	-- Validación alguna existencia previa del Periodo, Profesor y Curso (FN).
			dbo.RNF_ExisteProfesorID(@FK_Profesor) = 0 or
			dbo.RNF_ExisteCursoID(@FK_Curso) = 0)
				RETURN 0
			ELSE
			BEGIN
				INSERT INTO dbo.RN_Grupo(FK_PeriodoGrupo, FK_ProfesorGrupo, FK_CursoGrupo, Codigo, Cupo)
					VALUES(@FK_Periodo, @FK_Profesor, @FK_Curso, @Codigo, @Cupo) 
				RETURN 1
			END
		END
		ELSE
			RETURN 0
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedimiento para actualizar un Grupo.
CREATE PROCEDURE RNSP_ActualizarGrupo(@ID INT, @FK_Periodo INT, @FK_Profesor INT, @FK_Curso INT, @Codigo VARCHAR(50), @Cupo INT)
AS
BEGIN
	BEGIN TRY
		IF not exists (SELECT 1 FROM dbo.RN_Grupo G 		-- Validación alguna existencia previa del Grupo.
			WHERE G.ID <> @ID and G.Codigo = @Codigo)
		BEGIN
			UPDATE dbo.RN_Grupo SET FK_PeriodoGrupo = @FK_Periodo,
									FK_ProfesorGrupo = @FK_Profesor,
									FK_CursoGrupo = @FK_Curso,
									Codigo = @Codigo,
									Cupo = @Cupo
				FROM dbo.RN_Grupo G WHERE G.ID = @ID
			RETURN 1
		END
		ELSE
			RETURN 0
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END