/* Funciones utilitarias asociadas a los Cursos */

USE RegistroNotas

GO
-- Función para identificar un Curso con un ID como parámetro.
CREATE FUNCTION RNF_ExisteCursoID(@ID INT)
RETURNS BIT
AS
BEGIN
	DECLARE @Resultado BIT
	SET @Resultado = 0
	SELECT @Resultado = 1 FROM dbo.RN_Curso C
		WHERE C.ID = @ID
	RETURN @Resultado
END

GO
-- Función para identificar un Curso con un Código como parámetro.
CREATE FUNCTION RNF_ExisteCurso(@Codigo VARCHAR(50))
RETURNS BIT
AS 
BEGIN
	DECLARE @Resultado BIT
	SET @Resultado = 0
	SELECT @Resultado = 1 FROM dbo.RN_Curso C
		WHERE C.Codigo = @Codigo
	RETURN @Resultado
END