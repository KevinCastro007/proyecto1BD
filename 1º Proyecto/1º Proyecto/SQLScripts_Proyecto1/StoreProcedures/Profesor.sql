/* Procedimientos Almacenados asociadas a los Profesores */

USE RegistroNotas

GO
-- Procedmiento para obtener todos los valores de los Profesores registrados.
CREATE PROCEDURE RNSP_Profesores
AS
BEGIN
	BEGIN TRY
		SELECT P.ID, P.Usuario, P.Nombre FROM dbo.RN_Profesor P
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedmiento para obtener los valores de un Profesor con un Nombre de Usuario como parámetro.
CREATE PROCEDURE RNSP_Profesor(@Usuario VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		IF (dbo.RNF_ExisteProfesor(@Usuario) = 1)		-- Validación de alguna existencia previa del Profesor (FN).
		BEGIN
			SELECT P.ID, P.Usuario, P.Clave, P.Nombre FROM dbo.RN_Profesor P
				WHERE P.Usuario = @Usuario
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
-- Procedmiento para identificar un Profesor con un Nombre de Usuario y una Clave como parámetros.
CREATE PROCEDURE RNSP_IdentificarProfesor(@Usuario VARCHAR(50), @Clave VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		IF exists (SELECT 1 FROM dbo.RN_Profesor P
				WHERE P.Usuario = @Usuario and P.Clave = @Clave)
			RETURN 1
		ELSE
			RETURN 0
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO 
-- Procedimiento para insertar un Profesor.
CREATE PROCEDURE RNSP_InsertarProfesor(@Usuario VARCHAR(50), @Clave VARCHAR(50), @Nombre VARCHAR(50))
AS
BEGIN	BEGIN TRY
		IF (dbo.RNF_ExisteProfesor(@Usuario) = 0)			-- Validación de alguna existencia previa del Profesor (FN).
		BEGIN
			INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre)
				VALUES(@Usuario, @Clave, @Nombre)
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
-- Procedimiento para eliminar un Profesor con un Nombre de Usuario como parámetro.
CREATE PROCEDURE RNSP_EliminarProfesor(@Usuario VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		IF (dbo.RNF_ExisteProfesor(@Usuario) = 1)			-- Validación de alguna existencia previa del Profesor (FN).
		BEGIN			
			DELETE FROM dbo.RN_Profesor 
				WHERE Usuario = @Usuario
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
-- Procedimiento para actualizar un Profesor.
CREATE PROCEDURE RNSP_ActualizarProfesor(@ID INT, @Usuario VARCHAR(50), @Clave VARCHAR(50), @Nombre VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		IF not exists (SELECT 1 FROM dbo.RN_Profesor P 		-- Validación alguna existencia previa del Profesor.
			WHERE P.ID <> @ID and P.Usuario = @Usuario)
		BEGIN
			UPDATE dbo.RN_Profesor SET Usuario = @Usuario,
									   Clave = @Clave,
									   Nombre = @Nombre
				FROM dbo.RN_Profesor P WHERE P.ID = @ID
			RETURN 1
		END
		ELSE
			RETURN 0
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END