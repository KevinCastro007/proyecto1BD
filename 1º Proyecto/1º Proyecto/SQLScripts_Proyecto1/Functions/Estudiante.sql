/* Funciones utilitarias asociadas a los Estudiantes */

USE RegistroNotas

GO
-- Función para identificar un Estudiante con un ID como parámetro.
CREATE FUNCTION RNF_ExisteEstudianteID(@ID INT)
RETURNS BIT
AS 
BEGIN
	DECLARE @Resultado BIT
	SET @Resultado = 0
	SELECT @Resultado = 1 FROM dbo.RN_Estudiante E
		WHERE E.ID = @ID
	RETURN @Resultado
END

GO
-- Función para identificar un Estudiante con un Carné como parámetro.
CREATE FUNCTION RNF_ExisteEstudiante(@Carne VARCHAR(50))
RETURNS BIT
AS 
BEGIN
	DECLARE @Resultado BIT
	SET @Resultado = 0
	SELECT @Resultado = 1 FROM dbo.RN_Estudiante E
		WHERE E.Carne = @Carne
	RETURN @Resultado
END

