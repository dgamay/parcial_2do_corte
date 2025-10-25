// =====================================================================
//  ARCHIVO: task.js
//  DESCRIPCIÓN: Este archivo define la estructura del objeto "Task"
//  (tarea) dentro del sistema de gestión de tareas.
//  Representa cómo se almacena y manipula la información de cada tarea.
// =====================================================================

class Task {
  /**
   * Constructor de la clase Task.
   * @param {number} id - Identificador único de la tarea.
   * @param {string} title - Título o nombre de la tarea.
   * @param {string} description - Descripción detallada de la tarea.
   * @param {string} status - Estado actual de la tarea (por defecto "pending").
   *                          Puede ser: "pending", "in_progress", "completed", etc.
   * @param {string} dueDate - Fecha límite o de vencimiento de la tarea.
   */
  constructor(id, title, description, status = "pending", dueDate) {
    // Asigna el identificador único de la tarea
    this.id = id;

    // Asigna el título o nombre de la tarea
    this.title = title;

    // Asigna la descripción de la tarea
    this.description = description;

    // Asigna el estado de la tarea (por defecto es "pending")
    this.status = status;

    // Asigna la fecha de vencimiento o límite
    this.dueDate = dueDate;
  }
}

// Exporta la clase Task para que pueda ser utilizada
// en otros módulos como service, repository o controller.
module.exports = Task;

// =====================================================================
//  FIN DEL ARCHIVO
// =====================================================================

