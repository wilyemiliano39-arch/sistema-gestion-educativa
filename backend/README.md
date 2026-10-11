# Backend para SQL Server

Este proyecto incluye la interfaz visual en `app/` y el script SQL completo en `sql/`.

La conexión real a SQL Server debe hacerse desde un backend seguro, nunca desde el navegador. El navegador no debe tener acceso directo a credenciales ni a la instancia de SQL Server.

## Recomendación

Usar una API en Node.js con `mssql` o una solución ASP.NET Core con `SqlConnection`.

## Ejemplo de configuración segura

1. Copia `backend/.env.example` a `.env`.
2. Completa tus valores reales en el archivo `.env`.
3. Usa un backend que lea estas variables.
4. Nunca subas `.env` al repositorio.

## Ejemplo básico de conexión con Node.js

```bash
npm init -y
npm install express mssql dotenv
```

```js
const express = require('express');
const sql = require('mssql');
require('dotenv').config();

const app = express();

app.get('/api/estudiantes', async (req, res) => {
  try {
    await sql.connect({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_HOST,
      database: process.env.DB_NAME,
      options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
      }
    });

    const result = await sql.query('SELECT * FROM academico.estudiantes');
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error de conexión con SQL Server' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('API ejecutándose en el puerto 3000');
});
```

## Buenas prácticas

- Usar variables de entorno.
- Validar entradas en el servidor.
- Ejecutar consultas parametrizadas.
- Usar un usuario con permisos mínimos.
- No mostrar errores internos al usuario final.

## Nota importante

La interfaz de `app/index.html` es un prototipo funcional para demostrar la experiencia de usuario. La persistencia real se debe hacer en el backend con SQL Server.
