/* Funciones utilitarias asociadas a las Instancias de Evaluación */

USE RegistroNotas

GO
-- Función para obtener el ID de una Instancia con un nombre de tipo de Evaluación y una descripción como parámetros.
CREATE FUNCTION RNF_InstanciaID(@CodigoGrupo VARCHAR(50), @NombreEvaluacion VARCHAR(50), @Descripcion VARCHAR(50))
RETURNS INT
AS
BEGIN
	DECLARE @ID INT
	SELECT @ID = IE.ID FROM dbo.RN_InstanciaEvaluacion IE
		inner join dbo.RN_Evaluacion E ON E.ID = IE.FK_Evaluacion
		inner join dbo.RN_TipoEvaluacion TE ON TE.ID = E.FK_TipoEvaluacion
		inner join dbo.RN_Grupo G ON G.ID = E.FK_GrupoEvaluacion
		WHERE G.Codigo = @CodigoGrupo and TE.Nombre = @NombreEvaluacion and IE.Descripcion = @Descripcion
	RETURN @ID
END