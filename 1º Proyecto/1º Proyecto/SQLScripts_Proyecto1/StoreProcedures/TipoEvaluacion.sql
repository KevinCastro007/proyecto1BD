/* Procedimientos Almacenados asociadas a los Tipos de Evaluación */

USE RegistroNotas

GO
-- Procedmiento para obtener todos los valores de los Tipos de Evaluación registrados.
CREATE PROCEDURE RNSP_TiposEvaluacion
AS
BEGIN
	SELECT TE.Nombre FROM dbo.RN_TipoEvaluacion TE
END
