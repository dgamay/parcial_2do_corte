// =====================================================================
//  ARCHIVO: taskDto.js
//  DESCRIPCIÓN: Este archivo define la clase "TaskDTO".
//  Un DTO (Data Transfer Object) se utiliza para recibir y transportar
//  datos desde el cliente hacia el sistema sin exponer directamente
//  el modelo interno (Task). 
//  Su propósito es estandarizar los datos de entrada y garantizar
//  que se reciban únicamente los campos necesarios.
// =====================================================================

class TaskDTO {
  /**
   * Constructor de la clase TaskDTO.
   * @param {Object} data - Objeto que contiene los datos de la tarea enviados por el cliente.
   * @param {string} data.title - Título de la tarea.
   * @param {string} data.description - Descripción de la tarea.
   * @param {string} data.dueDate - Fecha de vencimiento de la tarea (opcional).
   */
  constructor({ title, description, dueDate }) {
    // Asigna el título de la tarea (campo obligatorio en la lógica del servicio).
    this.title = title;

    // Asigna la descripción de la tarea (opcional).
    this.description = description;

    // Asigna la fecha de vencimiento de la tarea.
    this.dueDate = dueDate;
  }
}

// Exporta la clase TaskDTO para que pueda ser utilizada en el controlador
// al momento de crear una nueva tarea.
module.exports = TaskDTO;

// =====================================================================
//  FIN DEL ARCHIVO
// =====================================================================
