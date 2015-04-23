/* Funciones utilitarias asociadas a los Grupos */

USE RegistroNotas

GO
-- Función para identificar un Grupo con un ID como parámetro.
CREATE FUNCTION RNF_ExisteGrupoID(@ID INT)
RETURNS BIT
AS
BEGIN
	DECLARE @Resultado BIT
	SET @Resultado = 0
	SELECT @Resultado = 1 FROM dbo.RN_Grupo G
		WHERE G.ID = @ID
	RETURN @Resultado
END

GO
-- Función para identificar un Grupo con un Código como parámetro.
CREATE FUNCTION RNF_ExisteGrupo(@Codigo VARCHAR(50))
RETURNS BIT
AS
BEGIN
	DECLARE @Resultado BIT
	SET @Resultado = 0
	SELECT @Resultado = 1 FROM dbo.RN_Grupo G
		WHERE G.Codigo = @Codigo
	RETURN @Resultado
END

GO
-- Función para obtener el ID asociado a un Grupo con un Código como parámetro.
CREATE FUNCTION RNF_GrupoCodigoID(@Codigo VARCHAR(50))
RETURNS INT
AS
BEGIN
	DECLARE @Resultado INT
	SET @Resultado = -1
	SELECT @Resultado = G.ID FROM dbo.RN_Grupo G
		WHERE G.Codigo = @Codigo
	RETURN @Resultado
END