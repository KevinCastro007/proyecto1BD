/* Funciones utilitarias asociadas a los Tipos de Evaluación */
USE RegistroNotas

GO
-- Función para obtener el ID asociado a un Tipo de Evaluación con un Nombre como parámetro.
CREATE FUNCTION RNF_TipoEvaluacionNombreID(@Nombre VARCHAR(50))
RETURNS INT
AS
BEGIN
	DECLARE @Resultado INT
	SET @Resultado = -1
	SELECT @Resultado = TE.ID FROM dbo.RN_TipoEvaluacion TE
		WHERE TE.Nombre = @Nombre
	RETURN @Resultado
END

GO
-- Función para obtener el Valor (BIT) asociado a un Tipo de Evaluación con un Nombre como parámetro.
CREATE FUNCTION RNF_TipoInstancia(@Nombre VARCHAR(50))
RETURNS BIT
AS
BEGIN
	DECLARE @Resultado BIT
	IF (@Nombre = 'Fija')
		SET @Resultado = 1
	ELSE
		SET @Resultado = 0
	RETURN @Resultado
END