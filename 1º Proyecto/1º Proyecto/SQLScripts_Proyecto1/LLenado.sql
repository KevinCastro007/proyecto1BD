/* - Script de llenado de datos de la BD RegistroNotas - */
GO
USE RegistroNotas

/* - Datos b�sicos - */
/* Inserci�n en la tabla de tipos de evaluaci�n: RN_TipoEvaluacion */
INSERT INTO dbo.RN_TipoEvaluacion(Nombre) VALUES('Examen')
INSERT INTO dbo.RN_TipoEvaluacion(Nombre) VALUES('Proyecto')
INSERT INTO dbo.RN_TipoEvaluacion(Nombre) VALUES('Tarea')
INSERT INTO dbo.RN_TipoEvaluacion(Nombre) VALUES('Quiz')
INSERT INTO dbo.RN_TipoEvaluacion(Nombre) VALUES('Asistencia')

/* Inserci�n en la tabla de periodos lectivos: RN_Periodo */
INSERT INTO dbo.RN_Periodo(FechaInicio, FechaFin) VALUES('2015-02-09', '2015-06-15')
INSERT INTO dbo.RN_Periodo(FechaInicio, FechaFin) VALUES('2015-07-08', '2015-10-18')
INSERT INTO dbo.RN_Periodo(FechaInicio, FechaFin) VALUES('2014-01-13', '2015-05-22')
INSERT INTO dbo.RN_Periodo(FechaInicio, FechaFin) VALUES('2014-06-05', '2015-09-22')

/* Inserci�n en la tabla de profesores: RN_Profesor */
INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre) VALUES('fquiros', '123', 'Franco Quir�s')
INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre) VALUES('jcastro', 'xyz', 'Jose Castro')
INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre) VALUES('akennedy', 'ana', 'Ana Kennedy')
INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre) VALUES('mmendez', '114', 'Miguel M�ndez')
INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre) VALUES('eavila', '223', 'Edgar �vila')
INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre) VALUES('cpaez', '333', 'Cristian P�ez')
INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre) VALUES('fdiaz', '123', 'Francisco D�az')
INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre) VALUES('jcastillo', 'xyz', 'Jose Castillo')
INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre) VALUES('agonza', 'ana', 'Ana Gonz�les')
INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre) VALUES('mmunoz', '114', 'Manuel Mu�oz')
INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre) VALUES('aguzman', '223', 'Antonio Guzm�n')
INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre) VALUES('cporras', '333', 'Carol Porras')
INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre) VALUES('silusaga', '158', 'Silvia Usaga')
INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre) VALUES('rocmuri', 'rox', 'Rocio Murillo')
INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre) VALUES('mamonge', '456', 'Manuel Monge')
INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre) VALUES('ferboga', '789', 'Fernando Bogantes')
INSERT INTO dbo.RN_Profesor(Usuario, Clave, Nombre) VALUES('felnun', '147', 'Felix Nu�ez')

/* Inserci�n en la tabla de estudiantes: RN_Estudiante */
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201258472, 'Kevin Castro Fuentes', 'castrokevin7@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201312345, 'Esteban Navarro Monge', 'esnamo.26@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201056522, 'Juana Castro P�rez', 'lajuanacastro@yahoo.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201597851, 'Steven D�az D�az', 'diazdiaz6@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200851129, 'Carlos P�rez Fuentes', 'carlos.1.perez@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201597855, 'Mar�a Herrera Z��iga', 'mariherrera.tec@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(199878859, 'Juan Calvo Cerdas', 'juan.clavo@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201497853, 'Francisco Fonseca Bonilla', 'franfobo@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201151128, 'Deiner Calder�n Ure�a', 'decalu15@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200797845, 'Mar�a Elena Guti�rrez Ure�a', 'nelaguti.tec74@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201397855, 'Jose Hern�ndez Hern�ndez', 'joseher77@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201178859, 'Misael Mar�n Bola�os', 'misabola69@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200497653, 'Rodrigo Navarro Vargas', 'rodrinav55@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200951129, 'Cristina Ure�a Ure�a', 'cristiure@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200597845, 'M�nica Mar�n Cordero', 'monik74@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201310580, 'Eli Montero Castillo', 'elimoncas7@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201078858, 'Eva Navarro Monge', 'evanamo@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201597852, 'Roger Navarro Alvarado', 'rogernava@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201151127, 'Fernanda Carballo Cerdas', 'feer.carballo14@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201597835, 'Carolina Chinchilla Ure�a', 'carochin26@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201397811, 'Nicol�s Ferreto Gonz�les', 'nicofergo03@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201178749, 'Elena Leal Elizondo', 'eleyileal17@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201467653, 'Jimmy Retana Fonseca', 'jimmyret66@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201048129, 'Cristian Robles Hidalgo', 'crisel.1.roble@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201488845, 'Marcelo Jim�nez Corrales', 'marcejico@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201311980, 'Mois�s Elizondo Monge', 'eli.moi.mon@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200921697, 'Kattia Castro Monge', 'kcastr.026@hotmial.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201597212, 'Esteban N��ez N��ez', 'esnunu06@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201111485, 'Juana de Arco de la O', 'juanadelao@yahoo.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201354932, 'Manuel D�az Porras', 'porras.manuel@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201333594, 'Enrique Herrera Centeno', 'enrique.08.herrera@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201154202, 'Mar�a Arce Bokan', 'maria.arce@correo.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200024156, 'Hazel Centeno N��ez', 'hacenteno@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200913542, 'Pedro Porras N��ez', 'pedrito.porras@yahoo.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(199821218, 'Hiner Ram�rez Hern�ndez', 'rami.hiner@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(199821002, 'Pedro Gonz�les Herrera', 'pedro.@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200698132, 'Jose Hern�ndez Bola�os', 'jose.bola@yahoo.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201457965, 'Tatiana Mar�n Corrales', 'tati.corrales@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201050059, 'Christoper Ram�rez Vargas', 'vargas02@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201154980, 'Cristina D�az Ure�a', 'cris.urena@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201005469, 'M�nica Morales Brenes', 'brenes.monica2@correo.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200995991, 'Rodrigo Guzm�n Corrales', 'guzman12844@yahoo.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200816584, 'Lorena Mar�an Vargas', 'lorenavargas.1@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201510858, 'Carlos Alv�rez Quir�s', 'carlos.2.alvarez@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201509870, 'Fernando Cerdas Cerdas', 'fer.cerdas@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201421098, 'Carol Ure�a D�az', 'caroldiaz@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201106540, 'Nikola Porras Porras', 'nikola.porras@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201098400, 'Juan Morales Guzm�n', 'eljuan.morales@yahoo.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201461113, 'Rodrigo Castro Castro', 'castrorodrigocastro@correo.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201005468, 'Cristiano Quir�s Fuentes', 'cristiano.fuentes@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201488000, 'Marcela Mart�nez Corrales', 'corrales.marce@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201301015, 'Christian Fuentes Monge', 'fuenes.monge.chris@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201158472, 'Salome Valverde Campos', 'solavalca.33@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201317345, 'Emilio Guitierrez Ure�a', 'emiguti.11@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201046522, 'Juan Elizondo Monge', 'juanmonge@yahoo.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201597861, 'Socorro Garcia Leon', 'socorrito23@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200751129, 'Claudio Fonseca Montes', 'claudiomontes@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201597755, 'Melania Banavides Acosta', 'melcosta66@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(199978859, 'Joaquin Duran Vargas', 'quincho99@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201397853, 'Fabian Soto Bogantes', 'fabsotob@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201152128, 'Denise Alfaro Madriz', 'denisealfa78@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200796845, 'Monica Marin Sanchez', 'monik.32@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201297855, 'Josafat Loria Amador', 'josama77@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201198859, 'Miguel Contreras Castro', 'micoca45@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200496653, 'Rigoberto Loaiza Solis', 'rogosol235@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200751119, 'Celeste Monge Naranjo', 'celesnaran88@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200897845, 'Daniela Montero Mata', 'danimota74@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201310570, 'Esmeralda Castillo Gonzalez', 'esmegon23@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201278858, 'Ernesto Torres Salazar', 'salatorres@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201597352, 'Roberto Fonseca Camacho', 'robertfon45@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201051127, 'Federico Porras Duarte', 'fededuarte14@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201597635, 'Clarisa Corrales Rodriguez', 'clarirodriguez75@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201377811, 'Nicole Juarez Megdalia', 'nicojua03@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200178749, 'Oliva Cortes Madrigal', 'madrigaloliva13@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201468653, 'Johanna Elizondo Volio', 'johavolio56@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201048629, 'Cristhoper Madrigal Ure�a', 'crismadrigal33@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201487845, 'Marilyn Navarrete Zeledon', 'marizele59@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201301980, 'Nuria Quesada Montero', 'nuri.que.mon@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200521697, 'Krysia Solis Mata', 'ksolis.236@hotmial.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201587212, 'Sebastian Cespedes Mendez', 'sebasmen.89@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201119485, 'Eimy Fonseca Martines', 'eimy.fon.marti@yahoo.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201334932, 'Arnoldo Quiros Monge', 'arnol.quiro@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201334594, 'Mario Chinchilla Lopez', 'mariochin.08@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201154902, 'Marianela Guiterres Ure�a ', 'nela.guti@correo.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200024056, 'Grettel Solano Sandi', 'gre.sol.san@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200919542, 'Pedro Perez Porras', 'pepeporras@yahoo.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(199821618, 'Ines Naranjo Estrada', 'ines.estrada@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(199821022, 'Patricia Mondragon Blanco', 'patri_blanco@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200698732, 'Kenia Navarro Duran', 'kenianadu@yahoo.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201459965, 'Jeremy Menez Madriz', 'menezjeremy.11@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201050259, 'Julian Torres Torres', 'juliantoto@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201054980, 'Daniel Pereira Pastor', 'dani.pastor@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201005669, 'Diego Baltodano Tenorio', 'diegobalto.52@correo.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200995981, 'Marlon Cordero Solano', 'marloncoso45@yahoo.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(200816184, 'Luis Camacho Calvo', 'luiselcalvo.1@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201510868, 'Andres Solis Laguna', 'lagunandres@gmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201509570, 'Sandra Cerdas Cordero', 'san.cerdas@hotmail.com')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201421078, 'Olga Cerdas Bustamante', 'olgabusta@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201106547, 'Francini Lopez Cordero', 'franlopez_56@hotmail.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201098440, 'Isaias Bustos Sardi', 'isa.sardi@yahoo.es')
INSERT INTO dbo.RN_Estudiante(Carne, Nombre, Email) VALUES(201461119, 'Ricardo Guerrero Azofeifa', 'ricardo.guerreo65@correo.es')

/* Inserci�n en la tabla de cursos: RN_Curso */
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('IC-2134', 'Arquitectura de Computadores')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('EM-0601', 'Matem�tica General')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('IC-0001', 'Introducci�n a la Programaci�n')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('IC-0002', 'Taller de Programaci�n')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('AE-7702', 'Desarrollo de Emprendedores')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('EM-0808', 'Matem�tica Discreta')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('IC-07C3', 'Bases de Datos I')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('IF-AC07', 'Exploraci�n Forestal')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('AE-0004', 'Costos II')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('EM-0202', 'C�lculo')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('ER-AR08', 'Comunicaci�n T�cnica')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('AE-0003', 'Costos I')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('FA-01A4', 'Aguas II')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('FA-01A5', 'Aguas I')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('AC-AS12', 'Introducci�n a la T�cnica, Ciencia y Tecnolog�a')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('IE-010D', 'Taller de Soldadura')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('AD-1202', 'Est�tica')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('EH-08A8', 'Estad�stica')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('IC-12DD', 'Bases de Datos Avanzadas')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('IE-AAC7', 'Exploraci�n Terrestre')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('AF-6924', 'Costos III')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('SE-0069', '�lgebra Lineal')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('IC-A2F8', 'Inteligencia Artificial')
INSERT INTO dbo.RN_Curso(Codigo, Nombre) VALUES('AA-2F03', 'Contadur�a')

/* Inserci�n en la tabla de grupos: RN_Grupo */
INSERT INTO dbo.RN_Grupo(FK_PeriodoGrupo, FK_ProfesorGrupo, FK_CursoGrupo, Codigo, Cupo) VALUES(1, 7, 10, 'OP-12', 32)
INSERT INTO dbo.RN_Grupo(FK_PeriodoGrupo, FK_ProfesorGrupo, FK_CursoGrupo, Codigo, Cupo) VALUES(3, 11, 3, 'ZP-0A', 25)
INSERT INTO dbo.RN_Grupo(FK_PeriodoGrupo, FK_ProfesorGrupo, FK_CursoGrupo, Codigo, Cupo) VALUES(2, 5, 5, 'CC-65', 70)
INSERT INTO dbo.RN_Grupo(FK_PeriodoGrupo, FK_ProfesorGrupo, FK_CursoGrupo, Codigo, Cupo) VALUES(1, 1, 12, 'A1-02', 32)

/* Inserci�n en la tabla de miembros: RN_Miembro */
--Grupo 1
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(1, 1, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(1, 3, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(1, 4, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(1, 5, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(1, 6, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(1, 7, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(1, 8, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(1, 9, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(1, 2, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(1, 11, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(1, 12, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(1, 13, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(1, 14, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(1, 15, 0, 'Activo')
--Grupo 2
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(2, 26, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(2, 27, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(2, 28, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(2, 29, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(2, 30, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(2, 31, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(2, 1, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(2, 33, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(2, 34, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(2, 35, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(2, 36, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(2, 37, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(2, 38, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(2, 2, 0, 'Activo')
--Grupo 2
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(3, 1, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(3, 52, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(3, 53, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(3, 54, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(3, 2, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(3, 56, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(3, 57, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(3, 58, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(3, 59, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(3, 60, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(3, 61, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(3, 62, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(3, 63, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(3, 64, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(3, 65, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(3, 66, 0, 'Activo')
--Grupo 4
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(4, 76, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(4, 77, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(4, 2, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(4, 79, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(4, 80, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(4, 81, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(4, 82, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(4, 83, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(4, 84, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(4, 85, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(4, 1, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(4, 87, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(4, 88, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(4, 89, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(4, 90, 0, 'Activo')
INSERT INTO dbo.RN_Miembro(FK_GrupoMiembro, FK_EstudianteMiembro, NotaAcumulada, Estado) VALUES(4, 91, 0, 'Activo')
