/* Procedimientos Almacenados asociadas a los Miembros */

USE RegistroNotas

GO
-- Procedimiento para insertar un Miembro.
CREATE PROCEDURE RNSP_InsertarMiembro(@FK_Grupo INT, @FK_Estudiante INT)
AS
BEGIN
	BEGIN TRY
		IF (dbo.RNF_ExisteMiembro(@FK_Grupo, @FK_Estudiante) = 0) 	-- Validaci�n de alguna existencia previa del Grupo y el Estudiante (FN).
		BEGIN
			INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado)
				VALUES(@FK_Grupo, @FK_Estudiante, 0, 'Activo')
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
-- Procedmiento para retirar justificadamente un Miembro con un ID como par�metro.
CREATE PROCEDURE RNSP_RetirarMiembroJustificadamente(@ID INT)
AS
BEGIN
	BEGIN TRY
		UPDATE dbo.RN_Miembro SET Estado = 'Retirado Justificadamente'
			FROM dbo.RN_Miembro M WHERE M.ID = @ID
		RETURN 1
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedmiento para retirar injustificadamente un Miembro con un ID como par�metro.
CREATE PROCEDURE RNSP_RetirarMiembroInjustificadamente(@ID INT)
AS
BEGIN
	BEGIN TRY
		UPDATE dbo.RN_Miembro SET Estado = 'Retirado Injustificadamente'
			FROM dbo.RN_Miembro M WHERE M.ID = @ID
		RETURN 1
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedimiento para actualizar la nota acumulada del Miembro de un Grupo espec�fico.
CREATE PROCEDURE RNSP_ActualizarNotaAcumulada(@Estudiante VARCHAR(50), @Grupo VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		-- Variable tabla para acumular las Evaluaciones del Grupo.
		DECLARE @Evaluacion TABLE(Llave INT IDENTITY(1, 1), ID INT, Porcentaje FLOAT, TipoInstancia BIT, CantidadInstancia INT)
		-- ID del Miembro.
		DECLARE @MiembroID INT
		SET @MiembroID = dbo.RNF_MiembroGrupoID(@Estudiante, @Grupo)							-- Funci�n utilitaria.
		-- Inserci�n de las Evaluaciones del Grupo.
		INSERT INTO @Evaluacion(ID, Porcentaje, TipoInstancia, CantidadInstancia)
			SELECT E.ID, E.Porcentaje, E.TipoInstancia, E.CantidadInstancia FROM dbo.RN_Evaluacion E
			WHERE E.FK_GrupoEvaluacion = dbo.RNF_GrupoCodigoID(@Grupo)							-- Funci�n utilitaria.
		DECLARE @HIGHe INT, @LOWe INT, 																
				@HIGHi INT, @LOWi INT, 
			@Total FLOAT, @Parcial FLOAT,														-- Nota acumulada y parcial.
			@EvaluacionID INT, @Porcentaje FLOAT, @TipoInstancia BIT, @CantidadInstancia INT,	-- Evaluaciones.
			@InstanciaID INT, @ValorInstancia FLOAT,											-- Instancias.
			@NotaInstancia FLOAT																-- Evaluaci�n del Miembro.	
		-- Cargar el m�ximo de las Evaluaciones.
		SELECT @HIGHe = MAX(E.Llave) FROM @Evaluacion E
		SET @HIGHe = @HIGHe + 1
		SET @LOWe = 1
		-- Total de la nota.
		SET @Total = 0		
		-- Tablas temporales para las Instancias : Fijas y Variables.
		CREATE TABLE #InstanciasVariables (Llave INT IDENTITY(1, 1), ID INT)
		CREATE TABLE #InstanciasFijas (Llave INT IDENTITY(1, 1), ID INT, Valor FLOAT)
		WHILE (@LOWe < @HIGHe) 																-- Atenci�n de cada Evaluaci�n.
		BEGIN	
			-- Datos de la Evaluaci�n espec�fica.
			SELECT @EvaluacionID = E.ID, 
				   @Porcentaje = E.Porcentaje, 
				   @TipoInstancia = E.TipoInstancia,
				   @CantidadInstancia = E.CantidadInstancia
				   FROM @Evaluacion E
				   WHERE E.Llave = @LOWe	
			IF (@TipoInstancia = 0)															-- Caso para las Instancias variables.
				BEGIN						
					-- Evaluaci�n de tipo de Instancia variable con Instancias registradas.
					IF (@CantidadInstancia > 0)
					BEGIN				
						-- Inserci�n de las Instancias variables.
						INSERT INTO #InstanciasVariables(ID)
							SELECT IE.ID FROM dbo.RN_InstanciaEvaluacion IE
							WHERE IE.FK_Evaluacion = @EvaluacionID	
						SELECT @HIGHi = MAX(I.Llave) FROM #InstanciasVariables I	
						SET @HIGHi = @HIGHi + 1	
						SET @LOWi = 1
						SET @Parcial = 0		
						WHILE (@LOWi < @HIGHi)												-- Atenci�n de cada Instancia.
						BEGIN												
							SELECT @InstanciaID = I.ID
								   FROM #InstanciasVariables I
								   WHERE I.Llave = @LOWi	
							SELECT @NotaInstancia = EM.Nota FROM dbo.RN_EvaluacionMiembro EM
								WHERE EM.FK_InstanciaEvaluacion = @InstanciaID and EM.FK_Miembro = @MiembroID							
							SET @Parcial = @Parcial + @NotaInstancia						-- Modificaci�n de la nota parical con la nota de la Instancia						   				
							SET @LOWi = @LOWi + 1
						END							
						TRUNCATE TABLE #InstanciasVariables									-- Reset de la Tabla de Instancias Variables.
						-- Modificaci�n de la nota total con la f�rmula espec�fica para el caso de la Instancias variables.
						SET @Total = @Total + (@Parcial / CAST(@CantidadInstancia AS FLOAT) * (@Porcentaje / CAST(100 AS FLOAT)))	
					END
					ELSE
					BEGIN
						SET @Total = @Total + @Porcentaje							
					END
				END
			ELSE																			-- Caso para las Instancias fijas.
				BEGIN			
					-- Inserci�n de las Instancias fijas.	
					INSERT INTO #InstanciasFijas(ID, Valor)
						SELECT IE.ID, IE.Valor FROM dbo.RN_InstanciaEvaluacion IE
						WHERE IE.FK_Evaluacion = @EvaluacionID	
					SELECT @HIGHi = MAX(I.Llave) FROM #InstanciasFijas I	
					SET @HIGHi = @HIGHi + 1
					SET @LOWi = 1				
					SET @Parcial = 0	
					WHILE (@LOWi < @HIGHi)
					BEGIN							
						SELECT @InstanciaID = I.ID,											-- Atenci�n de cada Instancia.
							   @ValorInstancia = I.Valor
								FROM #InstanciasFijas I
								WHERE I.Llave = @LOWi							
						SELECT @NotaInstancia = EM.Nota FROM dbo.RN_EvaluacionMiembro EM
							WHERE EM.FK_InstanciaEvaluacion = @InstanciaID and EM.FK_Miembro = @MiembroID
						-- Modificaci�n de la nota parical con la nota de la Instancia
						SET @Parcial = @Parcial + (@NotaInstancia * (@ValorInstancia / CAST(100 AS FLOAT)))												   				
						SET @LOWi = @LOWi + 1
					END						
					TRUNCATE TABLE #InstanciasFijas											-- Reset de la Tabla de Instancias Variables.	
					-- Modificaci�n de la nota total con la f�rmula espec�fica para el caso de la Instancias fijas.
					SET @Total = @Total + (@Parcial * (@Porcentaje / CAST(100 AS FLOAT)))	
				END
			SET @LOWe = @LOWe + 1
		END	
		UPDATE dbo.RN_Miembro SET NotaAcumulada = @Total 									-- Actualizaci�n de la nota acumulada para el Miembro espec�fico.
			FROM dbo.RN_Miembro M 
			WHERE M.ID = @MiembroID
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedmiento para obtener todos los valores de los Miembros registrados.
CREATE PROCEDURE RNSP_Miembros
AS
BEGIN
	BEGIN TRY
		SELECT M.ID, G.Codigo AS Grupo, E.Nombre AS Estudiante, M.NotaAcumulada, M.Estado FROM dbo.RN_Miembro M
			inner join dbo.RN_Grupo G ON G.ID =  M.FK_GrupoMiembro
			inner join dbo.RN_Estudiante E ON E.ID =  M.FK_EstudianteMiembro
			ORDER BY M.FK_GrupoMiembro
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedmiento para obtener un reporte de la informaci�n de todos los Miembros de un Grupo determinado.
CREATE PROCEDURE RNSP_ReporteMiembros(@Codigo VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		SELECT G.Codigo, E.Nombre, E.Email, M.NotaAcumulada FROM dbo.RN_Estudiante E
			inner join dbo.RN_Miembro M ON M.FK_EstudianteMiembro = E.ID
			inner join dbo.RN_Grupo G ON G.ID = M.FK_GrupoMiembro
			WHERE G.Codigo = @Codigo
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END

GO
-- Procedmiento para obtener un reporte de la informaci�n de un Miembro de un Grupo determinado.
CREATE PROCEDURE RNSP_ReporteMiembro(@Codigo VARCHAR(50), @Nombre VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		SELECT G.Codigo, E.Nombre, E.Email, M.NotaAcumulada FROM dbo.RN_Estudiante E
			inner join dbo.RN_Miembro M ON M.FK_EstudianteMiembro = E.ID
			inner join dbo.RN_Grupo G ON G.ID = M.FK_GrupoMiembro
			WHERE G.Codigo = @Codigo and E.Nombre = @Nombre
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END


GO
-- Procedmiento para obtener todos los Miembros de un Grupo determinado.
CREATE PROCEDURE RNSP_MiembrosGrupo(@Codigo VARCHAR(50))
AS
BEGIN
	BEGIN TRY
		SELECT E.Nombre FROM dbo.RN_Estudiante E
			inner join dbo.RN_Miembro M ON M.FK_EstudianteMiembro = E.ID
			inner join dbo.RN_Grupo G ON G.ID = M.FK_GrupoMiembro
			WHERE G.Codigo = @Codigo
	END TRY
	BEGIN CATCH
		RETURN @@ERROR * -1
	END CATCH
END