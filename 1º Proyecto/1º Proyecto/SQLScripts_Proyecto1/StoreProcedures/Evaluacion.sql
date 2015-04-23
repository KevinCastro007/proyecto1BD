/* Procedimientos Almacenados asociadas a las Evaluaciones */

USE RegistroNotas

GO
-- Procedimiento para obtener los datos de las Evaluaciones de un Grupo con un Código de Grupo como parámetro.
-- Se realiza un INNER JOIN de tablas para acceder a los valores correspondientes.
CREATE PROCEDURE RNSP_EvaluacionesGrupo(@Codigo VARCHAR(50))
AS 
BEGIN
	BEGIN TRY
		SELECT TE.Nombre, E.Porcentaje, E.TipoInstancia, E.CantidadInstancia FROM dbo.RN_Evaluacion E
			inner join dbo.RN_TipoEvaluacion TE ON TE.ID = E.FK_TipoEvaluacion
			inner join dbo.RN_Grupo G ON G.ID = E.FK_GrupoEvaluacion
			WHERE G.Codigo = @Codigo
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedimineto para obtener la descripción y el valor de las Instancias de Evaluación de una 
-- Evaluación determinada perteneciente a un Grupo específico.
CREATE PROCEDURE RNSP_InstanciasEvaluacionGrupo(@NombreEvaluacion VARCHAR(50), @CodigoGrupo VARCHAR(50)) 
AS
BEGIN
	BEGIN TRY
		SELECT IE.Descripcion, IE.Valor FROM dbo.RN_InstanciaEvaluacion IE
			inner join dbo.RN_Evaluacion E ON E.ID = IE.FK_Evaluacion
			inner join dbo.RN_TipoEvaluacion TE ON TE.ID = E.FK_TipoEvaluacion
			inner join dbo.RN_Grupo G ON G.ID = E.FK_GrupoEvaluacion
			WHERE TE.Nombre = @NombreEvaluacion and G.Codigo = @CodigoGrupo						
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedimineto para obtener la descripción, el valor y la nota de las Instancias de Evaluación de Miembro 
-- a través de una Evaluación determinada perteneciente a un Grupo específico.
CREATE PROCEDURE RNSP_InstanciasEvaluacionMiembroGrupo(@NombreEvaluacion VARCHAR(50), @CodigoGrupo VARCHAR(50), @NombreEstudiante VARCHAR(50)) 
AS
BEGIN
	BEGIN TRY
		SELECT IE.Descripcion, IE.Valor, EM.Nota, IE.Fecha FROM dbo.RN_InstanciaEvaluacion IE
			inner join dbo.RN_Evaluacion E ON E.ID = IE.FK_Evaluacion
			inner join dbo.RN_TipoEvaluacion TE ON TE.ID = E.FK_TipoEvaluacion
			inner join dbo.RN_Grupo G ON G.ID = E.FK_GrupoEvaluacion
			inner join dbo.RN_Miembro M ON M.FK_GrupoMiembro = G.ID
			inner join dbo.RN_Estudiante Es ON Es.ID = M.FK_EstudianteMiembro
			inner join dbo.RN_EvaluacionMiembro EM ON EM.FK_InstanciaEvaluacion = IE.ID and EM.FK_Miembro = M.ID
			WHERE TE.Nombre = @NombreEvaluacion and G.Codigo = @CodigoGrupo	and Es.Nombre = @NombreEstudiante					
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedimiento para insertar una Evaluación.
-- Se recibe el valor porcentual como un VARCHAR, pues se presentan problemas en la capa lógica.
--		Se realiza la conversión correspondiente.
-- Se comprueban el valor porcentual y la cantidad de instancias.
CREATE PROCEDURE RNSP_InsertarEvaluacion(@Grupo VARCHAR(50), @TipoEvaluacion VARCHAR(50), @PorcentajeS VARCHAR(50), 
										@CantidadInstancia INT, @TipoInstancia VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		DECLARE @Porcentaje FLOAT
		SET @Porcentaje = CONVERT(FLOAT, @PorcentajeS)
		IF (@Porcentaje > 0 and @Porcentaje <= 100 and @CantidadInstancia >= 0)
		BEGIN
			INSERT INTO dbo.RN_Evaluacion(FK_GrupoEvaluacion, FK_TipoEvaluacion, Porcentaje, TipoInstancia, CantidadInstancia)
				VALUES(dbo.RNF_GrupoCodigoID(@Grupo), dbo.RNF_TipoEvaluacionNombreID(@TipoEvaluacion), @Porcentaje, dbo.RNF_TipoInstancia(@TipoInstancia), @CantidadInstancia)
			RETURN 1			
		END
		ELSE
			RETURN 0
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedimiento para insertar una Instancia de Evaluación
-- Se recibe el valor como un VARCHAR, pues se presentan problemas en la capa lógica.
--		Se realiza la conversión correspondiente.
CREATE PROCEDURE RNSP_InsertarInstancia(@Grupo VARCHAR(50), @Evaluacion VARCHAR(50), @ValorS VARCHAR(50), @Descripcion VARCHAR(128), @Fecha DATE) 
AS
BEGIN
	BEGIN TRY
		DECLARE @Valor FLOAT, @EvaluacionID INT
		SET @Valor = CONVERT(FLOAT, @ValorS)
		SET @EvaluacionID = dbo.RNF_EvaluacionID(@Grupo, @Evaluacion)
		INSERT INTO dbo.RN_InstanciaEvaluacion(FK_Evaluacion, Valor, Descripcion, Fecha)
			VALUES(@EvaluacionID, @Valor, @Descripcion, @Fecha)
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END


GO
-- Procedimiento para inicializar las notas de las Instancias de Evaluación de cada Miembros de un Grupo en 0.
CREATE PROCEDURE RNSP_InicializarNotas(@NombreMiembro VARCHAR(50), @CodigoGrupo VARCHAR(50), @Evaluacion VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		DECLARE @InstanciaID INT, @MiembroID INT, @HIGH INT, @LOW INT
		DECLARE @Instancias TABLE(Llave INT IDENTITY(1, 1), ID INT)
		SET @MiembroID = dbo.RNF_MiembroGrupoID(@NombreMiembro, @CodigoGrupo)		
		INSERT INTO @Instancias(ID)																-- Se cargan las Instancias de la Evaluación especificada.
			SELECT IE.ID FROM dbo.RN_InstanciaEvaluacion IE
			WHERE IE.FK_Evaluacion = dbo.RNF_EvaluacionID(@CodigoGrupo, @Evaluacion)
		SELECT @HIGH = MAX(I.Llave) FROM @Instancias I
		SET @HIGH = @HIGH + 1
		SET @LOW = 1
		WHILE (@LOW < @HIGH)
		BEGIN
			SELECT @InstanciaID = I.ID FROM @Instancias I
				WHERE I.Llave = @LOW			
			IF not exists (SELECT 1 FROM dbo.RN_EvaluacionMiembro EM 							-- Se valida que no se haya inicializado la Evaluación del Miembro.	
				WHERE EM.FK_Miembro = @MiembroID and EM.FK_InstanciaEvaluacion = @InstanciaID)
			BEGIN
				INSERT INTO dbo.RN_EvaluacionMiembro(FK_InstanciaEvaluacion, FK_Miembro, Nota)
					VALUES(@InstanciaID, @MiembroID, 0)
			END		
			SET @LOW = @LOW + 1
		END
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedimiento para actualizar la nota de un Miembro
CREATE PROCEDURE RNSP_ActualizarNota(@CodigoGrupo VARCHAR(50), @Estudiante VARCHAR(50), @Evaluacion VARCHAR(50), @Instancia VARCHAR(50), @NotaS VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		DECLARE @Nota FLOAT, @MiembroID INT, @InstanciaID INT
		SET @Nota = CONVERT(FLOAT, @NotaS)
		SET @MiembroID = dbo.RNF_MiembroGrupoID(@Estudiante, @CodigoGrupo)
		SET @InstanciaID = dbo.RNF_InstanciaID(@CodigoGrupo, @Evaluacion, @Instancia)
		UPDATE dbo.RN_EvaluacionMiembro SET Nota = @Nota
			FROM dbo.RN_EvaluacionMiembro EM WHERE EM.FK_Miembro = @MiembroID and EM.FK_InstanciaEvaluacion = @InstanciaID		
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedimiento para aumentar en uno la cantidad de instancias de una Evaluacion
CREATE PROCEDURE RNSP_AumentarCantidadInstancias(@Grupo VARCHAR(50), @Evaluacion VARCHAR(50))
AS
BEGIN 
	BEGIN TRY
		UPDATE dbo.RN_Evaluacion SET CantidadInstancia = CantidadInstancia + 1
			FROM dbo.RN_Evaluacion E
			inner join dbo.RN_Grupo G ON G.ID = E.FK_GrupoEvaluacion
			inner join dbo.RN_TipoEvaluacion TE ON TE.ID = E.FK_TipoEvaluacion			
			WHERE G.Codigo = @Grupo and TE.Nombre = @Evaluacion
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END
