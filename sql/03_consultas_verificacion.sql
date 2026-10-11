USE InstitucionEducativa;
GO

SELECT * FROM academico.estudiantes;
SELECT * FROM academico.profesores;
SELECT * FROM academico.asignaturas;
SELECT * FROM academico.inscripciones;
GO

-- Consulta por estudiante con sus asignaturas
SELECT e.idEstudiante, e.matricula, e.nombre, e.apellido, a.nombreAsignatura, i.estado, i.fechaInscripcion
FROM academico.estudiantes e
INNER JOIN academico.inscripciones i ON e.idEstudiante = i.idEstudiante
INNER JOIN academico.asignaturas a ON a.idAsignatura = i.idAsignatura
ORDER BY e.apellido, e.nombre;
GO

-- Consulta por asignatura con sus estudiantes
SELECT a.codigoAsignatura, a.nombreAsignatura, p.nombre + ' ' + p.apellido AS profesor,
       e.matricula, e.nombre, e.apellido, i.estado
FROM academico.asignaturas a
LEFT JOIN academico.profesores p ON a.idProfesor = p.idProfesor
LEFT JOIN academico.inscripciones i ON a.idAsignatura = i.idAsignatura
LEFT JOIN academico.estudiantes e ON e.idEstudiante = i.idEstudiante
ORDER BY a.nombreAsignatura, e.apellido;
GO

-- Conteo de estudiantes por asignatura
SELECT a.nombreAsignatura, COUNT(i.idInscripcion) AS totalInscritos
FROM academico.asignaturas a
LEFT JOIN academico.inscripciones i ON a.idAsignatura = i.idAsignatura
GROUP BY a.nombreAsignatura
ORDER BY totalInscritos DESC;
GO

-- Consulta de estudiantes activos
SELECT idEstudiante, matricula, nombre, apellido, edad
FROM academico.estudiantes
WHERE estado = 1;
GO

-- Consulta de profesores por especialidad
SELECT especialidad, COUNT(*) AS totalProfesores
FROM academico.profesores
GROUP BY especialidad;
GO
