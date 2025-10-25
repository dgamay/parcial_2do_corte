// =====================================================================
//  ARCHIVO: app.js
//  DESCRIPCIÓN: Este archivo configura y levanta el servidor principal
//  del sistema de gestión de tareas usando Node.js y Express.
// =====================================================================

// 1️⃣ Importamos la librería Express
// Express es un framework para crear servidores web de manera sencilla.
const express = require("express");

// 2️⃣ Creamos una instancia de aplicación (nuestro servidor)
const app = express();

// 3️⃣ Definimos el puerto donde el servidor escuchará las peticiones
const PORT = 3000;

// =====================================================================
//  CONFIGURACIONES GENERALES
// =====================================================================

// 4️⃣ Middleware para procesar datos en formato JSON.
// Esto permite que Express entienda automáticamente el cuerpo (body)
// de las solicitudes que vengan en formato JSON, por ejemplo en un POST.
app.use(express.json());

// =====================================================================
//  IMPORTACIÓN DE CONTROLADORES O RUTAS
// =====================================================================

// 5️⃣ Importamos el controlador de tareas.
// Este archivo contiene todas las rutas del CRUD (crear, leer, actualizar, eliminar)
// y se encuentra en la carpeta "controller".
const taskController = require("./controller/taskController");

// =====================================================================
//  DEFINICIÓN DE RUTAS PRINCIPALES
// =====================================================================

// 6️⃣ Montamos las rutas del controlador en la aplicación principal.
// Al usar "/", todas las rutas definidas dentro de "taskController"
// estarán disponibles directamente (por ejemplo: /tasks, /tasks/:id, etc.)
app.use("/", taskController);

// 7️⃣ Ruta base de bienvenida.
// Esta ruta responde cuando accedemos directamente a http://localhost:3000/
// y muestra un mensaje simple de confirmación de que el servidor está activo.
app.get("/", (req, res) => {
  res.send("Bienvenido al sistema de gestión de tareas");
});

// =====================================================================
//  INICIO DEL SERVIDOR
// =====================================================================

// 8️Iniciamos el servidor en el puerto indicado (3000).
// Una vez que el servidor arranca, muestra un mensaje en consola.
app.listen(PORT, () => 
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
);

// =====================================================================
//  FIN DEL ARCHIVO
// =====================================================================
