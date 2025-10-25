// =====================================================================
//  ARCHIVO: taskController.js
//  DESCRIPCIÓN: Este archivo define las rutas del CRUD (crear, leer,
//  actualizar y eliminar) para el sistema de gestión de tareas.
//  Aquí solo se manejan las peticiones HTTP y las respuestas al cliente.
//  Toda la lógica del negocio se delega al "taskService".
// =====================================================================

// 1. Importamos la librería Express para crear un enrutador
const express = require("express");

// 2. Creamos un "router", que nos permite definir rutas de forma modular
const router = express.Router();

// 3. Importamos el servicio que contiene la lógica de negocio
//    Este archivo se encuentra en la carpeta "service/"
const service = require("../service/taskService");

// 4. Importamos el DTO (Data Transfer Object)
//    Este objeto define la estructura de los datos que se reciben al crear tareas
const TaskDTO = require("../dto/taskDto");

// =====================================================================
//  RUTA: CREAR TAREA (CREATE)
//  MÉTODO: POST
//  URL: /tasksModel
// =====================================================================

router.post("/tasks", (req, res) => {
  try {
    // Se crea un nuevo objeto DTO con los datos enviados en el cuerpo (body)
    const dto = new TaskDTO(req.body);

    // Se llama al servicio para crear una nueva tarea
    const task = service.createTask(dto);

    // Si todo sale bien, se devuelve la tarea creada con código HTTP 201 (Created)
    res.status(201).json(task);

  } catch (e) {
    // Si ocurre un error (por ejemplo, falta el título), se envía un 400 (Bad Request)
    res.status(400).json({ error: e.message });
  }
});

// =====================================================================
//  RUTA: LISTAR TAREAS (READ)
//  MÉTODO: GET
//  URL: /tasks
//  Permite obtener todas las tareas o filtrarlas por estado (?status=...)
// =====================================================================

router.get("/tasks", (req, res) => {
  // Captura el parámetro "status" de la URL (ejemplo: /tasks?status=pending)
  const { status } = req.query;

  // Llama al servicio para obtener las tareas (todas o filtradas)
  const tasks = service.getTasks(status);

  // Devuelve la lista en formato JSON
  res.json(tasks);
});

// =====================================================================
//  RUTA: ACTUALIZAR ESTADO DE UNA TAREA (UPDATE)
//  MÉTODO: PATCH
//  URL: /tasks/:id/status
//  Permite cambiar el estado de una tarea existente (por ejemplo, de "pending" a "completed")
// =====================================================================

router.patch("/tasks/:id/status", (req, res) => {
  try {
    // Extrae el ID de la tarea desde la URL y el nuevo estado desde el cuerpo (body)
    const updated = service.updateStatus(req.params.id, req.body.status);

    // Si se actualiza correctamente, devuelve la tarea modificada
    res.json(updated);

  } catch (e) {
    // Si la tarea no se encuentra, devuelve un 404 (Not Found)
    res.status(404).json({ error: e.message });
  }
});

// =====================================================================
//  RUTA: ELIMINAR TAREA (DELETE)
//  MÉTODO: DELETE
//  URL: /tasks/:id
//  Elimina una tarea específica por su ID
// =====================================================================

router.delete("/tasks/:id", (req, res) => {
  // Llama al servicio para eliminar la tarea con el ID recibido
  service.deleteTask(req.params.id);

  // Devuelve un código 204 (No Content) indicando que la tarea se eliminó correctamente
  res.status(204).send();
});

// =====================================================================
//  RUTA: LISTAR TAREAS VENCIDAS (EXTRA)
//  MÉTODO: GET
//  URL: /tasks/overdue
//  Devuelve todas las tareas cuya fecha de vencimiento ya pasó
// =====================================================================

router.get("/tasks/overdue", (req, res) => {
  // Llama al servicio que filtra las tareas vencidas
  const overdueTasks = service.getOverdue();

  // Envía la lista de tareas vencidas al cliente
  res.json(overdueTasks);
});

// =====================================================================
//  EXPORTACIÓN DEL ROUTER
// =====================================================================

// Exporta el "router" para que pueda ser usado en app.js
// Cuando se importa en app.js y se hace app.use("/", router),
// todas estas rutas quedan disponibles para el cliente.
module.exports = router;

// =====================================================================
//  FIN DEL ARCHIVO
// =====================================================================
