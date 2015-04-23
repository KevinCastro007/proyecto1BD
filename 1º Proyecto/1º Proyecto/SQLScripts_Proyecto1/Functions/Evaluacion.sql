/* Funciones utilitarias asociadas a las Evaluaciones */

USE RegistroNotas

GO
-- Función para obtener el ID de una Evaluación, con un código de Grupo y nombre de tipo de Evaluación como parámetros
CREATE FUNCTION RNF_EvaluacionID(@CodigoGrupo VARCHAR(50), @NombreEvaluacion VARCHAR(50))
RETURNS INT
AS
BEGIN
	DECLARE @ID INT
	SELECT @ID = E.ID FROM dbo.RN_Evaluacion E
		inner join dbo.RN_Grupo G ON G.ID = E.FK_GrupoEvaluacion
		inner join dbo.RN_TipoEvaluacion TE ON TE.ID = E.FK_TipoEvaluacion
		WHERE G.Codigo = @CodigoGrupo and TE.Nombre = @NombreEvaluacion	
	RETURN @ID	
END
