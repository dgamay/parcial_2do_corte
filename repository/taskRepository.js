// =====================================================================
//  ARCHIVO: taskRepository.js
//  DESCRIPCIÓN: Este archivo representa la capa de acceso a datos.
//  Se encarga de almacenar, recuperar, modificar y eliminar las tareas.
//  En esta implementación, los datos se mantienen en memoria dentro
//  de un arreglo llamado "tasks".
// =====================================================================

// 1. Arreglo que actúa como base de datos temporal en memoria.
//    Cada elemento del arreglo será un objeto de tipo Task.
const tasks = [];

// 2. Exportación de un objeto que contiene los métodos de acceso a datos.
module.exports = {

  /**
   * Crea una nueva tarea y la agrega a la lista.
   * @param {Task} task - Objeto de tarea a almacenar.
   * @returns {Task} La tarea recién creada.
   */
  create(task) {
    tasks.push(task);
    return task;
  },

  /**
   * Devuelve todas las tareas almacenadas.
   * @returns {Task[]} Lista completa de tareas.
   */
  findAll() {
    return tasks;
  },

  /**
   * Busca tareas según su estado (status).
   * @param {string} status - Estado de las tareas a filtrar (por ejemplo, "pending").
   * @returns {Task[]} Lista de tareas que coinciden con el estado.
   */
  findByStatus(status) {
    return tasks.filter(t => t.status === status);
  },

  /**
   * Actualiza el estado de una tarea específica.
   * @param {number} id - Identificador de la tarea a actualizar.
   * @param {string} newStatus - Nuevo estado que se desea asignar.
   * @returns {Task|null} La tarea actualizada o null si no se encontró.
   */
  updateStatus(id, newStatus) {
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) return null;
    task.status = newStatus;
    return task;
  },

  /**
   * Elimina una tarea de la lista según su identificador.
   * @param {number} id - Identificador de la tarea a eliminar.
   */
  delete(id) {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    if (index >= 0) tasks.splice(index, 1);
  },

  /**
   * Obtiene todas las tareas que ya están vencidas.
   * Se consideran vencidas aquellas cuya fecha de vencimiento (dueDate)
   * es anterior a la fecha actual y que no estén marcadas como "completed".
   * @returns {Task[]} Lista de tareas vencidas.
   */
  overdue() {
    const now = new Date();
    return tasks.filter(t => new Date(t.dueDate) < now && t.status !== "completed");
  }
};

// =====================================================================
//  FIN DEL ARCHIVO
// =====================================================================
