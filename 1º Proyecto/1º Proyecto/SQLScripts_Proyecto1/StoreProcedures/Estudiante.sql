/* Procedimientos Almacenados asociadas a los Estudiantes */

USE RegistroNotas

GO
-- Procedmiento para obtener todos los valores de los Estudiantes registrados.
CREATE PROCEDURE RNSP_Estudiantes
AS
BEGIN
	BEGIN TRY
		SELECT E.ID, E.Carne, E.Nombre, E.Email FROM dbo.RN_Estudiante E
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedmiento para obtener los valores de un Estudiante con un Carné como parámetro.
CREATE PROCEDURE RNSP_Estudiante(@Carne VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		IF (dbo.RNF_ExisteEstudiante(@Carne) = 1)			-- Validación de alguna existencia previa del Curso (FN).
		BEGIN
			SELECT E.ID, E.Carne, E.Nombre, E.Email FROM dbo.RN_Estudiante E
				WHERE E.Carne = @Carne
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
-- Procedimiento para insertar un Estudiante.
CREATE PROCEDURE RNSP_InsertarEstudiante(@Carne VARCHAR(50), @Nombre VARCHAR(50), @Email VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		IF (dbo.RNF_ExisteEstudiante(@Carne) = 0)			-- Validación de alguna existencia previa del Estudiante (FN).
		BEGIN
			INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email)
				VALUES(@Carne, @Nombre, @Email)
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
-- Procedimiento para eliminar un Estudiante con un Carné como parámetro.
CREATE PROCEDURE RNSP_EliminarEstudiante(@Carne VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		IF (dbo.RNF_ExisteEstudiante(@Carne) = 1)			-- Validación de alguna existencia previa del Estudiante (FN).
		BEGIN			
			DELETE FROM dbo.RN_Estudiante 
				WHERE Carne = @Carne
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
-- Procedimiento para actualizar un Estudiante.
CREATE PROCEDURE RNSP_ActualizarEstudiante(@ID INT, @Carne VARCHAR(50), @Nombre VARCHAR(50), @Email VARCHAR(50))
AS
BEGIN
	BEGIN TRY
			IF not exists (SELECT 1 FROM dbo.RN_Estudiante E 		-- Validación de alguna existencia previa del Estudiante.
				WHERE E.ID <> @ID and E.Carne = @Carne)
			BEGIN
				UPDATE dbo.RN_Estudiante SET Email = @Email,
										     Nombre = @Nombre,
											 Carne = @Carne
					FROM dbo.RN_Estudiante E WHERE E.ID = @ID	
				RETURN 1
			END
			ELSE
				RETURN 0
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END
