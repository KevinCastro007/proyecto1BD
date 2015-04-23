/* Procedimientos Almacenados asociadas a los Cursos */

USE RegistroNotas

GO
-- Procedmiento para obtener todos los valores de los Cursos registrados.
CREATE PROCEDURE RNSP_Cursos
AS
BEGIN
	BEGIN TRY
		SELECT C.ID, C.Codigo, C.Nombre FROM dbo.RN_Curso C
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedmiento para obtener los valores de un Curso con un Código como parámetro.
CREATE PROCEDURE RNSP_Curso(@Codigo VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		IF (dbo.RNF_ExisteCurso(@Codigo) = 1)		-- Validación de alguna existencia previa del Curso (FN).
		BEGIN
			SELECT C.ID, C.Codigo, C.Nombre FROM dbo.RN_Curso C
				WHERE C.Codigo = @Codigo
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
-- Procedimiento para insertar un Curso.
CREATE PROCEDURE RNSP_InsertarCurso(@Codigo VARCHAR(50), @Nombre VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		IF (dbo.RNF_ExisteCurso(@Codigo) = 0)		-- Validación de alguna existencia previa del Curso (FN).
		BEGIN
			INSERT INTO dbo.RN_Curso(Codigo, Nombre)
				VALUES(@Codigo, @Nombre) 
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
-- Procedimiento para eliminar un Curso con un Código como parámetro.
CREATE PROCEDURE RNSP_EliminarCurso(@Codigo VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		IF (dbo.RNF_ExisteCurso(@Codigo) = 1)		-- Validación de alguna existencia previa del Curso (FN).
		BEGIN			
			DELETE FROM dbo.RN_Curso 
				WHERE Codigo = @Codigo
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
-- Procedimiento para actualizar un Curso.
CREATE PROCEDURE RNSP_ActualizarCurso(@ID INT, @Codigo VARCHAR(50), @Nombre VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		IF not exists (SELECT 1 FROM dbo.RN_Curso C 	-- Validación de alguna existencia previa del Curso.
			WHERE C.ID <> @ID and C.Codigo = @Codigo)
		BEGIN
			UPDATE dbo.RN_Curso SET Codigo = @Codigo, Nombre = @Nombre
				FROM dbo.RN_Curso C WHERE C.ID = @ID
			RETURN 1
		END
		ELSE
			RETURN 0
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END