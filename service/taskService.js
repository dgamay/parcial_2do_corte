// =====================================================================
//  ARCHIVO: taskService.js
//  DESCRIPCIÓN: Este archivo contiene la lógica de negocio del sistema
//  de gestión de tareas. 
//  Aquí se definen las reglas, validaciones y procesos que se aplican
//  antes de interactuar con la capa de datos (repository).
// =====================================================================

// 1. Importa la clase Task (modelo de datos) desde la carpeta model.
//    Representa la estructura de una tarea dentro del sistema.
const Task = require("../model/task");

// 2. Importa el repositorio encargado del acceso y manipulación de datos.
//    Esta capa maneja el almacenamiento (en memoria o en base de datos).
const repository = require("../repository/taskRepository");

// 3. Variable global para asignar un identificador incremental a cada tarea creada.
let nextId = 1;

// 4. Exporta un objeto con los métodos que representan las operaciones
//    principales sobre las tareas.
module.exports = {

  /**
   * Crea una nueva tarea en el sistema.
   * @param {Object} dto - Objeto de transferencia de datos con la información de la tarea.
   * @returns {Task} La tarea creada.
   */
  createTask(dto) {
    // Verifica que el título exista; es un campo obligatorio.
    if (!dto.title) throw new Error("El título es obligatorio");

    // Crea una nueva instancia de Task usando los datos del DTO.
    // Asigna automáticamente un ID incremental y el estado inicial "pending".
    const task = new Task(nextId++, dto.title, dto.description, "pending", dto.dueDate);

    // Envía la tarea al repositorio para guardarla.
    return repository.create(task);
  },

  /**
   * Obtiene todas las tareas o las filtra según su estado.
   * @param {string} [status] - Estado opcional para filtrar las tareas (por ejemplo, "pending").
   * @returns {Task[]} Lista de tareas encontradas.
   */
  getTasks(status) {
    // Si se proporciona un estado, busca por estado; de lo contrario, devuelve todas.
    return status ? repository.findByStatus(status) : repository.findAll();
  },

  /**
   * Actualiza el estado de una tarea existente.
   * @param {number} id - Identificador de la tarea a modificar.
   * @param {string} status - Nuevo estado que se desea asignar.
   * @returns {Task} La tarea actualizada.
   */
  updateStatus(id, status) {
    // Llama al repositorio para actualizar la tarea.
    const updated = repository.updateStatus(id, status);

    // Si la tarea no existe, lanza un error.
    if (!updated) throw new Error("Tarea no encontrada");

    // Devuelve la tarea actualizada.
    return updated;
  },

  /**
   * Elimina una tarea del sistema.
   * @param {number} id - Identificador de la tarea a eliminar.
   */
  deleteTask(id) {
    // Llama al repositorio para eliminar la tarea por ID.
    repository.delete(id);
  },

  /**
   * Obtiene todas las tareas vencidas.
   * @returns {Task[]} Lista de tareas cuyo vencimiento ha pasado.
   */
  getOverdue() {
    // Solicita al repositorio todas las tareas vencidas.
    return repository.overdue();
  }
};

// =====================================================================
//  FIN DEL ARCHIVO
// =====================================================================
