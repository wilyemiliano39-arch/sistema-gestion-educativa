USE InstitucionEducativa;
GO

INSERT INTO academico.profesores (identificacion, nombre, apellido, correo, telefono, especialidad, activo)
VALUES
('P-001', 'María', 'López', 'maria.lopez@institucion.edu', '555-1111', 'Matemáticas', 1),
('P-002', 'Carlos', 'Ramírez', 'carlos.ramirez@institucion.edu', '555-2222', 'Programación', 1),
('P-003', 'Fernanda', 'Sosa', 'fernanda.sosa@institucion.edu', '555-3333', 'Biología', 1),
('P-004', 'Jorge', 'Vargas', 'jorge.vargas@institucion.edu', '555-4444', 'Historia', 1);
GO

INSERT INTO academico.estudiantes (matricula, identificacion, nombre, apellido, fechaNacimiento, genero, correo, telefono, telefonoEmergencia, direccion, estado)
VALUES
('E-2024-001', '2024-001', 'Ana', 'García', '2007-03-15', 'F', 'ana.garcia@email.com', '777-1001', '777-2001', 'Calle 10 #12', 1),
('E-2024-002', '2024-002', 'Luis', 'Mendoza', '2008-07-22', 'M', 'luis.mendoza@email.com', '777-1002', NULL, 'Avenida 5 #7', 1),
('E-2024-003', '2024-003', 'Sofía', 'Pérez', '2007-12-05', 'F', 'sofia.perez@email.com', '777-1003', '777-2003', 'Barrio Norte', 1),
('E-2024-004', '2024-004', 'Mateo', 'Castro', '2006-09-18', 'M', 'mateo.castro@email.com', '777-1004', NULL, 'Colonia Central', 1),
('E-2024-005', '2024-005', 'Valeria', 'Ruiz', '2009-01-30', 'F', 'valeria.ruiz@email.com', '777-1005', '777-2005', 'Calle Los Pinos', 0);
GO

INSERT INTO academico.asignaturas (codigoAsignatura, nombreAsignatura, descripcion, creditos, ciclo, idProfesor, cupoMaximo, activo)
VALUES
('MAT-101', 'Matemáticas I', 'Fundamentos de algebra y lógica matemática.', 4, 'Primer semestre', 1, 35, 1),
('PRO-201', 'Programación I', 'Introducción a la lógica de programación.', 4, 'Segundo semestre', 2, 30, 1),
('BIO-110', 'Biología General', 'Estudio de conceptos básicos de biología.', 3, 'Primer semestre', 3, 25, 1),
('HIS-220', 'Historia Universal', 'Análisis de hechos históricos relevantes.', 3, 'Tercer semestre', 4, 28, 1);
GO

INSERT INTO academico.inscripciones (idEstudiante, idAsignatura, fechaInscripcion, estado, observaciones)
VALUES
(1, 1, '2024-02-01', 'Activa', 'Inscripción inicial'),
(1, 2, '2024-02-02', 'Pendiente', 'Documentación pendiente'),
(2, 1, '2024-02-03', 'Activa', 'Estudiante nuevo'),
(3, 3, '2024-02-04', 'Activa', 'Curso recomendado'),
(4, 2, '2024-02-05', 'Aprobada', 'Curso completado'),
(5, 4, '2024-02-06', 'Cancelada', 'Se retiró');
GO

PRINT 'Datos de prueba insertados correctamente.';
GO
