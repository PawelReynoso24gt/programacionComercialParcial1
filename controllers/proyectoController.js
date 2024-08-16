'use strict';
const db = require('../models');
const Proyecto = db.Proyectos;

// Crear un nuevo proyecto
module.exports.createProyecto = async (req, res) => {
  try {
    const { nombreProyecto, descripcion, fechaInicio, fechaFinal, porcentaje } = req.body;
    
    const nuevoProyecto = await Proyecto.create({
      nombreProyecto,
      descripcion,
      fechaInicio,
      fechaFinal,
      porcentaje
    });
    
    res.status(201).json(nuevoProyecto);
  } catch (error) {
    console.error('Error al crear el proyecto:', error);
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
};

// Obtener todos los proyectos
module.exports.getAllProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    res.status(200).json(proyectos);
  } catch (error) {
    console.error('Error al obtener los proyectos:', error);
    res.status(500).json({ error: 'Error al obtener los proyectos' });
  }
};

// Obtener un proyecto por ID
module.exports.getProyectoById = async (req, res) => {
  try {
    const { idProyecto } = req.params;
    const proyecto = await Proyecto.findByPk(idProyecto);

    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.status(200).json(proyecto);
  } catch (error) {
    console.error('Error al obtener el proyecto:', error);
    res.status(500).json({ error: 'Error al obtener el proyecto' });
  }
};

// Actualizar un proyecto por ID
module.exports.updateProyecto = async (req, res) => {
  try {
    const { idProyecto } = req.params;
    const { nombreProyecto, descripcion, fechaInicio, fechaFinal, porcentaje } = req.body;
    
    const proyecto = await Proyecto.findByPk(idProyecto);

    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    proyecto.nombreProyecto = nombreProyecto || proyecto.nombreProyecto;
    proyecto.descripcion = descripcion || proyecto.descripcion;
    proyecto.fechaInicio = fechaInicio || proyecto.fechaInicio;
    proyecto.fechaFinal = fechaFinal || proyecto.fechaFinal;
    proyecto.porcentaje = porcentaje || proyecto.porcentaje;
    
    await proyecto.save();

    res.status(200).json(proyecto);
  } catch (error) {
    console.error('Error al actualizar el proyecto:', error);
    res.status(500).json({ error: 'Error al actualizar el proyecto' });
  }
};

// Eliminar un proyecto por ID
module.exports.deleteProyecto = async (req, res) => {
  try {
    const { idProyecto } = req.params;
    const proyecto = await Proyecto.findByPk(idProyecto);

    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    await proyecto.destroy();

    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
    res.status(500).json({ error: 'Error al eliminar el proyecto' });
  }
};
