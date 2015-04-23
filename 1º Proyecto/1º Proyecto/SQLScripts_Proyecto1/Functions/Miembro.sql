/* Funciones utilitarias asociadas a los Miembros */

USE RegistroNotas

GO
-- Función para identificar un Miembro con un ID de un Grupo y de un Estudiante como parámetros.
CREATE FUNCTION RNF_ExisteMiembro(@FK_Grupo INT, @FK_Estudiante INT)
RETURNS BIT
AS
BEGIN
	DECLARE @Resultado BIT
	SET @Resultado = 0
	SELECT @Resultado = 1 FROM dbo.RN_Miembro M
		WHERE M.FK_GrupoMiembro = @FK_Grupo and M.FK_EstudianteMiembro = @FK_Estudiante
	RETURN @Resultado
END

GO
-- Función para obtener el ID de un Miembro con un nombre de Estudiante y código de Grupo como parámetros.
CREATE FUNCTION RNF_MiembroGrupoID(@Nombre VARCHAR(50), @Codigo VARCHAR(50))
RETURNS INT
AS
BEGIN
	DECLARE @ID INT
	SELECT @ID = M.ID FROM dbo.RN_Miembro M
		inner join dbo.RN_Grupo G ON G.ID = M.FK_GrupoMiembro
		inner join dbo.RN_Estudiante E ON E.ID = M.FK_EstudianteMiembro
		WHERE E.Nombre = @Nombre and G.Codigo = @Codigo
	RETURN @ID
END