'use strict';
const Sequelize = require('sequelize');
const db = require('../models');
const Empleado = db.Empleados;

// Crear un nuevo empleado
module.exports.createEmpleado = async (req, res) => {
  try {
    const { nombreEmpleado, email, telefono, estado } = req.body;
    
    const nuevoEmpleado = await Empleado.create({
      nombreEmpleado,
      email,
      telefono,
      estado
    });
    
    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    console.error('Error al crear el empleado:', error);
    res.status(500).json({ error: 'Error al crear el empleado' });
  }
};

// Obtener todos los empleados
module.exports.getAllEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.status(200).json(empleados);
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    res.status(500).json({ error: 'Error al obtener los empleados' });
  }
};

// Obtener un empleado por ID
module.exports.getEmpleadoById = async (req, res) => {
  try {
    const { idEmpleado } = req.params;
    const empleado = await Empleado.findByPk(idEmpleado);

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    res.status(200).json(empleado);
  } catch (error) {
    console.error('Error al obtener el empleado:', error);
    res.status(500).json({ error: 'Error al obtener el empleado' });
  }
};

// Actualizar un empleado por ID
module.exports.updateEmpleado = async (req, res) => {
  try {
    const { idEmpleado } = req.params;
    const { nombreEmpleado, email, telefono, estado } = req.body;
    
    const empleado = await Empleado.findByPk(idEmpleado);

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    empleado.nombreEmpleado = nombreEmpleado || empleado.nombreEmpleado;
    empleado.email = email || empleado.email;
    empleado.telefono = telefono || empleado.telefono;
    empleado.estado = estado || empleado.estado;
    
    await empleado.save();

    res.status(200).json(empleado);
  } catch (error) {
    console.error('Error al actualizar el empleado:', error);
    res.status(500).json({ error: 'Error al actualizar el empleado' });
  }
};

// Eliminar un empleado por ID
module.exports.deleteEmpleado = async (req, res) => {
  try {
    const { idEmpleado } = req.params;
    const empleado = await Empleado.findByPk(idEmpleado);

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    await empleado.destroy();

    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error al eliminar el empleado:', error);
    res.status(500).json({ error: 'Error al eliminar el empleado' });
  }
};
