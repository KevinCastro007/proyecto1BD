/* Funciones utilitarias asociadas a las Instancias de Evaluaci�n */

USE RegistroNotas

GO
-- Funci�n para obtener el ID de una Instancia con un nombre de tipo de Evaluaci�n y una descripci�n como par�metros.
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