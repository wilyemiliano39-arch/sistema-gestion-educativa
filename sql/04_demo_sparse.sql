USE InstitucionEducativa;
GO

-- ------------------------------------------------------------
-- DEMOSTRACIÓN ACADÉMICA DE COLUMNA SPARSE
-- ------------------------------------------------------------
-- Este bloque no reemplaza la estructura principal y se usa con
-- fines didácticos para mostrar cómo se crea una columna SPARSE.

IF COL_LENGTH('academico.estudiantes', 'telefonoEmergencia') IS NOT NULL
BEGIN
    PRINT 'La columna telefonoEmergencia ya existe y se puede demostrar con SPARSE.';
END
ELSE
BEGIN
    ALTER TABLE academico.estudiantes
        ADD telefonoEmergencia VARCHAR(15) NULL SPARSE;

    UPDATE academico.estudiantes
    SET telefonoEmergencia = '777-9001'
    WHERE idEstudiante = 3;

    PRINT 'Columna SPARSE creada y actualizada correctamente.';
END
GO

-- Verificación visual del uso
SELECT idEstudiante, nombre, apellido, telefono, telefonoEmergencia
FROM academico.estudiantes;
GO
