'use strict';
const db = require('../models');
const Asignacion = db.Asignacion;

// Crear una nueva asignación
module.exports.createAsignacion = async (req, res) => {
  try {
    const { fechaAsignacion, idEmpleado, idProyecto } = req.body;
    
    // Verificar si el empleado y el proyecto existen
    const empleado = await db.Empleados.findByPk(idEmpleado);
    const proyecto = await db.Proyectos.findByPk(idProyecto);

    if (!empleado || !proyecto) {
      return res.status(404).json({ error: 'Empleado o Proyecto no encontrado' });
    }

    const nuevaAsignacion = await Asignacion.create({
      fechaAsignacion,
      idEmpleado,
      idProyecto
    });
    
    res.status(201).json(nuevaAsignacion);
  } catch (error) {
    console.error('Error al crear la asignación:', error);
    res.status(500).json({ error: 'Error al crear la asignación' });
  }
};

// Obtener todas las asignaciones
module.exports.getAllAsignaciones = async (req, res) => {
  try {
    const asignaciones = await Asignacion.findAll();
    res.status(200).json(asignaciones);
  } catch (error) {
    console.error('Error al obtener las asignaciones:', error);
    res.status(500).json({ error: 'Error al obtener las asignaciones' });
  }
};

// Obtener una asignación por ID
module.exports.getAsignacionById = async (req, res) => {
  try {
    const { idAsignacion } = req.params;
    const asignacion = await Asignacion.findByPk(idAsignacion);

    if (!asignacion) {
      return res.status(404).json({ error: 'Asignación no encontrada' });
    }

    res.status(200).json(asignacion);
  } catch (error) {
    console.error('Error al obtener la asignación:', error);
    res.status(500).json({ error: 'Error al obtener la asignación' });
  }
};

// Actualizar una asignación por ID
module.exports.updateAsignacion = async (req, res) => {
  try {
    const { idAsignacion } = req.params;
    const { fechaAsignacion, idEmpleado, idProyecto } = req.body;
    
    const asignacion = await Asignacion.findByPk(idAsignacion);

    if (!asignacion) {
      return res.status(404).json({ error: 'Asignación no encontrada' });
    }

    asignacion.fechaAsignacion = fechaAsignacion || asignacion.fechaAsignacion;
    asignacion.idEmpleado = idEmpleado || asignacion.idEmpleado;
    asignacion.idProyecto = idProyecto || asignacion.idProyecto;
    
    await asignacion.save();

    res.status(200).json(asignacion);
  } catch (error) {
    console.error('Error al actualizar la asignación:', error);
    res.status(500).json({ error: 'Error al actualizar la asignación' });
  }
};

// Eliminar una asignación por ID
module.exports.deleteAsignacion = async (req, res) => {
  try {
    const { idAsignacion } = req.params;
    const asignacion = await Asignacion.findByPk(idAsignacion);

    if (!asignacion) {
      return res.status(404).json({ error: 'Asignación no encontrada' });
    }

    await asignacion.destroy();

    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error al eliminar la asignación:', error);
    res.status(500).json({ error: 'Error al eliminar la asignación' });
  }
};
