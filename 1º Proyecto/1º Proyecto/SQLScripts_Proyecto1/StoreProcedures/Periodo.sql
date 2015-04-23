/* Procedimientos Almacenados asociadas a los Estudiantes */

USE RegistroNotas

GO
-- Procedmiento para obtener todos los valores de los Periodos registrados.
CREATE PROCEDURE RNSP_Periodos
AS
BEGIN
	BEGIN TRY
		SELECT P.ID, 'FechaInicio' = CONVERT(VARCHAR(50), P.FechaInicio), 'FechaFin' = CONVERT(VARCHAR(50), P.FechaFin) FROM RN_Periodo P
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedmiento para obtener los valores de un Periodo con una Fecha de Inicio como parámetro.
CREATE PROCEDURE RNSP_Periodo(@FechaInicio VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		IF (dbo.RNF_ExistePeriodo(@FechaInicio) = 1)		-- Validación de alguna existencia previa del Periodo (FN).
		BEGIN
			SELECT P.ID, 'FechaInicio' = CONVERT(VARCHAR(50), P.FechaInicio), 'FechaFin' = CONVERT(VARCHAR(50), P.FechaFin) FROM RN_Periodo P
				WHERE P.FechaInicio = @FechaInicio
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
-- Procedimiento para insertar un Periodo.
CREATE PROCEDURE RNSP_InsertarPeriodo(@FechaInicio VARCHAR(50), @FechaFin VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		IF (ISDATE(@FechaInicio) = 1 or ISDATE(@FechaFin) = 1)	-- Validación de los datos de entrada como fechas.
		BEGIN
			IF (@FechaInicio > @FechaFin)						-- Validación de Fechas Inicio y Fin.
				RETURN 0
			ELSE
			BEGIN
				INSERT INTO dbo.RN_Periodo(FechaInicio, FechaFin)
					VALUES(CONVERT(DATE, @FechaInicio), CONVERT(DATE, @FechaFin))
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
-- Procedimiento para actualizar un Periodo.
CREATE PROCEDURE RNSP_ActualizarPeriodo(@ID INT, @FechaInicio VARCHAR(50), @FechaFin VARCHAR(50))
AS
BEGIN
	BEGIN TRY
			IF not exists (SELECT 1 FROM dbo.RN_Periodo P 				-- Validación de alguna existencia previa del Periodo.
				WHERE P.ID <> @ID and P.FechaInicio = @FechaInicio)
			BEGIN
				IF (ISDATE(@FechaInicio) = 0 or ISDATE(@FechaFin) = 0)
					RETURN 0
				IF (@FechaInicio > @FechaFin)
					RETURN 0
				ELSE
				BEGIN
					UPDATE dbo.RN_Periodo SET FechaInicio = @FechaInicio, FechaFin = @FechaFin
						FROM dbo.RN_Periodo E WHERE E.ID = @ID	
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