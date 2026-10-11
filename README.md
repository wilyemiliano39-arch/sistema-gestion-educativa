# Sistema de Gestión de una Institución Educativa

Proyecto universitario académico para modelar una base de datos relacional usando Microsoft SQL Server (T-SQL) y una interfaz administrativa moderna.

## Objetivo

Diseñar, documentar y entregar una solución funcional para gestionar:
- estudiantes
- profesores
- asignaturas
- inscripciones

## Estructura del repositorio

- `sql/01_creacion_bd.sql` — creación de la base de datos, esquema, tablas, restricciones e índices.
- `sql/02_datos_prueba.sql` — inserción de datos ficticios para pruebas.
- `sql/03_consultas_verificacion.sql` — consultas de validación, joins y pruebas.
- `sql/04_demo_sparse.sql` — ejemplo académico de columna SPARSE compatible con SQL Server.
- `docs/documentacion.md` — documentación completa para presentación universitaria.
- `app/index.html` — interfaz administrativa visual.
- `app/styles.css` — diseño institucional en azul oscuro, blanco y neutros.
- `app/app.js` — lógica de formulario, validación, filtros y tablas.
- `backend/.env.example` — ejemplo seguro de configuración para un backend real con SQL Server.
- `backend/README.md` — instrucciones para conectar con SQL Server mediante backend.

## Importante sobre SQL Server

La interfaz web del proyecto se entrega como una aplicación frontal estática para demostrar la experiencia de usuario; no se conecta directamente a SQL Server desde el navegador. Esto es intencional y correcto según la arquitectura web: la conexión real a SQL Server debe realizarse desde un backend seguro (por ejemplo, Node.js + `mssql` o ASP.NET Core + Entity Framework).

## Cómo ejecutar el proyecto

### 1) Base de datos SQL Server

1. Abre SQL Server Management Studio (SSMS).
2. Ejecuta `sql/01_creacion_bd.sql` en orden.
3. Ejecuta `sql/02_datos_prueba.sql`.
4. Verifica con `sql/03_consultas_verificacion.sql`.
5. Si deseas practicar SPARSE, ejecuta `sql/04_demo_sparse.sql`.

### 2) Interfaz visual

Abre el archivo `app/index.html` en un navegador o sirve la carpeta con un servidor local simple.

Ejemplo:

```bash
cd app
python -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

## Recomendación para producción

Para una implementación real con SQL Server, usa un backend seguro con variables de entorno y validación de servidor. El archivo `backend/.env.example` muestra la forma correcta.

## Documentación académica

Consulta `docs/documentacion.md` para:
- portada editable
- objetivos
- entidades
- diccionario de datos
- diagrama ER
- normalización
- columnas calculadas y SPARSE
- pruebas y resultados esperados

## Nota académica

Este proyecto está pensado como un ejercicio universitario introductorio, con diseño claro, comentarios explicativos y un enfoque pedagógico. Está preparado para demostrarse en clase y para servir como base del trabajo grupal.
