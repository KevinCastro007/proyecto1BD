/* Funciones utilitarias asociadas a los Profesores */
USE RegistroNotas

GO
-- Función para identificar un Profesor con un ID como parámetro.
CREATE FUNCTION RNF_ExisteProfesorID(@ID INT)
RETURNS BIT
AS 
BEGIN
	DECLARE @Resultado BIT
	SET @Resultado = 0
	SELECT @Resultado = 1 FROM dbo.RN_Profesor P
		WHERE P.ID = @ID
	RETURN @Resultado
END

GO
-- Función para identificar un Profesor con un Nombre de Usuario como parámetro.
CREATE FUNCTION RNF_ExisteProfesor(@Usuario VARCHAR(50))
RETURNS BIT
AS 
BEGIN
	DECLARE @Resultado BIT
	SET @Resultado = 0
	SELECT @Resultado = 1 FROM dbo.RN_Profesor P
		WHERE P.Usuario = @Usuario
	RETURN @Resultado
END

GO
-- Función para identificar un Profesor con un Nombre de Usuario y un Clave como parámetros.
CREATE FUNCTION RNF_IdentificarProfesor(@Usuario VARCHAR(50), @Clave VARCHAR(50))
RETURNS BIT
AS
BEGIN
	DECLARE @Resultado BIT
	SET @Resultado = 0
	SELECT @Resultado = 1 FROM dbo.RN_Profesor P
		WHERE P.Usuario = @Usuario and P.Clave = @Clave
	RETURN @Resultado
END

GO
-- Función para obtener el ID asociado a un Profesor con un Nombre de Usuario como parámetro.
CREATE FUNCTION RNF_ProfesorID(@Usuario VARCHAR(50))
RETURNS INT
AS
BEGIN
	DECLARE @Resultado INT
	SELECT @Resultado = P.ID FROM dbo.RN_Profesor P
		WHERE P.Usuario = @Usuario
	RETURN @Resultado
END