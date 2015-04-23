/* Funciones utilitarias asociadas a los Periodos */

USE RegistroNotas

GO
-- Función para identificar un Periodo con un ID como parámetro.
CREATE FUNCTION RNF_ExistePeriodoID(@ID INT)
RETURNS BIT
AS 
BEGIN
	DECLARE @Resultado BIT
	SET @Resultado = 0
	SELECT @Resultado = 1 FROM dbo.RN_Periodo P
		WHERE P.ID = @ID
	RETURN @Resultado
END

GO
-- Función para identificar un Periodo con una Fecha de Inicio como parámetro.
CREATE FUNCTION RNF_ExistePeriodo(@FechaInicio VARCHAR(50))
RETURNS BIT
AS 
BEGIN
	DECLARE @Resultado BIT
	SET @Resultado = 0
	SELECT @Resultado = 1 FROM dbo.RN_Periodo P
		WHERE P.FechaInicio = @FechaInicio
	RETURN @Resultado
END