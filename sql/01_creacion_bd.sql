USE master;
GO

IF DB_ID('InstitucionEducativa') IS NOT NULL
BEGIN
    PRINT 'La base de datos InstitucionEducativa ya existe.';
END
ELSE
BEGIN
    CREATE DATABASE InstitucionEducativa;
    PRINT 'Base de datos InstitucionEducativa creada correctamente.';
END
GO

USE InstitucionEducativa;
GO

-- ------------------------------------------------------------
-- Esquema académico
-- ------------------------------------------------------------
IF SCHEMA_ID('academico') IS NULL
BEGIN
    EXEC('CREATE SCHEMA academico;');
END
GO

-- ------------------------------------------------------------
-- Tabla: academico.profesores
-- ------------------------------------------------------------
IF OBJECT_ID('academico.profesores', 'U') IS NOT NULL
    DROP TABLE academico.profesores;
GO

CREATE TABLE academico.profesores (
    idProfesor INT IDENTITY(1,1) NOT NULL,
    identificacion VARCHAR(20) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    telefono VARCHAR(15) NULL,
    especialidad VARCHAR(100) NULL,
    activo BIT NOT NULL CONSTRAINT DF_profesores_activo DEFAULT (1),
    fechaRegistro DATETIME2 NOT NULL CONSTRAINT DF_profesores_fechaRegistro DEFAULT (SYSDATETIME()),
    CONSTRAINT PK_profesores PRIMARY KEY (idProfesor),
    CONSTRAINT UQ_profesores_identificacion UNIQUE (identificacion),
    CONSTRAINT UQ_profesores_correo UNIQUE (correo),
    CONSTRAINT CK_profesores_correo CHECK (correo LIKE '%@%')
);
GO

-- ------------------------------------------------------------
-- Tabla: academico.estudiantes
-- ------------------------------------------------------------
IF OBJECT_ID('academico.estudiantes', 'U') IS NOT NULL
    DROP TABLE academico.estudiantes;
GO

CREATE TABLE academico.estudiantes (
    idEstudiante INT IDENTITY(1,1) NOT NULL,
    matricula VARCHAR(20) NOT NULL,
    identificacion VARCHAR(20) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    genero CHAR(1) NOT NULL,
    correo VARCHAR(150) NULL,
    telefono VARCHAR(15) NULL,
    telefonoEmergencia VARCHAR(15) NULL SPARSE,
    direccion VARCHAR(200) NULL,
    estado BIT NOT NULL CONSTRAINT DF_estudiantes_estado DEFAULT (1),
    fechaRegistro DATETIME2 NOT NULL CONSTRAINT DF_estudiantes_fechaRegistro DEFAULT (SYSDATETIME()),
    edad AS (DATEDIFF(YEAR, fechaNacimiento, GETDATE())),
    CONSTRAINT PK_estudiantes PRIMARY KEY (idEstudiante),
    CONSTRAINT UQ_estudiantes_matricula UNIQUE (matricula),
    CONSTRAINT UQ_estudiantes_identificacion UNIQUE (identificacion),
    CONSTRAINT UQ_estudiantes_correo UNIQUE (correo),
    CONSTRAINT CK_estudiantes_genero CHECK (genero IN ('M','F','O')),
    CONSTRAINT CK_estudiantes_fechaNacimiento CHECK (fechaNacimiento <= GETDATE())
);
GO

-- ------------------------------------------------------------
-- Tabla: academico.asignaturas
-- ------------------------------------------------------------
IF OBJECT_ID('academico.asignaturas', 'U') IS NOT NULL
    DROP TABLE academico.asignaturas;
GO

CREATE TABLE academico.asignaturas (
    idAsignatura INT IDENTITY(1,1) NOT NULL,
    codigoAsignatura VARCHAR(20) NOT NULL,
    nombreAsignatura VARCHAR(100) NOT NULL,
    descripcion VARCHAR(250) NOT NULL,
    creditos TINYINT NOT NULL,
    ciclo VARCHAR(30) NOT NULL,
    idProfesor INT NULL,
    cupoMaximo SMALLINT NOT NULL CONSTRAINT DF_asignaturas_cupoMaximo DEFAULT (35),
    activo BIT NOT NULL CONSTRAINT DF_asignaturas_activo DEFAULT (1),
    CONSTRAINT PK_asignaturas PRIMARY KEY (idAsignatura),
    CONSTRAINT UQ_asignaturas_codigoAsignatura UNIQUE (codigoAsignatura),
    CONSTRAINT FK_asignaturas_profesores FOREIGN KEY (idProfesor) REFERENCES academico.profesores(idProfesor),
    CONSTRAINT CK_asignaturas_creditos CHECK (creditos BETWEEN 1 AND 12),
    CONSTRAINT CK_asignaturas_ciclo CHECK (ciclo <> '')
);
GO

-- ------------------------------------------------------------
-- Tabla: academico.inscripciones
-- ------------------------------------------------------------
IF OBJECT_ID('academico.inscripciones', 'U') IS NOT NULL
    DROP TABLE academico.inscripciones;
GO

CREATE TABLE academico.inscripciones (
    idInscripcion INT IDENTITY(1,1) NOT NULL,
    idEstudiante INT NOT NULL,
    idAsignatura INT NOT NULL,
    fechaInscripcion DATETIME2 NOT NULL CONSTRAINT DF_inscripciones_fechaInscripcion DEFAULT (SYSDATETIME()),
    estado VARCHAR(15) NOT NULL CONSTRAINT DF_inscripciones_estado DEFAULT ('Activa'),
    observaciones VARCHAR(200) NULL,
    CONSTRAINT PK_inscripciones PRIMARY KEY (idInscripcion),
    CONSTRAINT FK_inscripciones_estudiantes FOREIGN KEY (idEstudiante) REFERENCES academico.estudiantes(idEstudiante),
    CONSTRAINT FK_inscripciones_asignaturas FOREIGN KEY (idAsignatura) REFERENCES academico.asignaturas(idAsignatura),
    CONSTRAINT CK_inscripciones_estado CHECK (estado IN ('Activa','Pendiente','Cancelada','Aprobada')),
    CONSTRAINT UQ_inscripciones_estudiante_asignatura UNIQUE (idEstudiante, idAsignatura)
);
GO

-- ------------------------------------------------------------
-- Índices útiles
-- ------------------------------------------------------------
CREATE INDEX IX_estudiantes_matricula ON academico.estudiantes(matricula);
CREATE INDEX IX_estudiantes_identificacion ON academico.estudiantes(identificacion);
CREATE INDEX IX_profesores_identificacion ON academico.profesores(identificacion);
CREATE INDEX IX_asignaturas_codigoAsignatura ON academico.asignaturas(codigoAsignatura);
CREATE INDEX IX_inscripciones_estudiante ON academico.inscripciones(idEstudiante);
CREATE INDEX IX_inscripciones_asignatura ON academico.inscripciones(idAsignatura);
GO

PRINT 'Estructura de la base de datos creada correctamente.';
GO
