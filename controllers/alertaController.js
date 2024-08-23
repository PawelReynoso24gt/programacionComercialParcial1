'use strict';
const Sequelize = require('sequelize');
const db = require('../models');
const Alerta = db.Alerta;
const Proyectos = db.Proyectos; // Asegúrate de importar el modelo de Proyectos

// Crear una nueva alerta
module.exports.createAlerta = async (req, res) => {
  try {
    const { descripcion, idProyecto } = req.body;

    // Obtener el proyecto asociado a la alerta
    const proyecto = await Proyectos.findByPk(idProyecto);

    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    // Comparar la fechaFinal del proyecto con la fecha actual
    const fechaFinal = new Date(proyecto.fechaFinal);
    const fechaHoy = new Date();
    const diferenciaEnDias = Math.ceil((fechaFinal - fechaHoy) / (1000 * 60 * 60 * 24));

    if (diferenciaEnDias > 7) {
      return res.status(400).json({ error: 'El proyecto no está dentro del período de alerta permitido' });
    }

    // Crear la nueva alerta
    const nuevaAlerta = await Alerta.create({
      descripcion,
      idProyecto
    });

    res.status(201).json(nuevaAlerta);
  } catch (error) {
    console.error('Error al crear la alerta:', error);
    res.status(500).json({ error: 'Error al crear la alerta' });
  }
};

// Obtener todas las alertas
module.exports.getAllAlertas = async (req, res) => {
  try {
    const alertas = await Alerta.findAll();
    res.status(200).json(alertas);
  } catch (error) {
    console.error('Error al obtener las alertas:', error);
    res.status(500).json({ error: 'Error al obtener las alertas' });
  }
};

// Obtener una alerta por ID
module.exports.getAlertaById = async (req, res) => {
  try {
    const { idAlerta } = req.params;
    const alerta = await Alerta.findByPk(idAlerta);

    if (!alerta) {
      return res.status(404).json({ error: 'Alerta no encontrada' });
    }

    res.status(200).json(alerta);
  } catch (error) {
    console.error('Error al obtener la alerta:', error);
    res.status(500).json({ error: 'Error al obtener la alerta' });
  }
};

// Actualizar una alerta por ID
module.exports.updateAlerta = async (req, res) => {
    try {
      const { idAlerta } = req.params;
      const { idProyecto } = req.body;
  
      // Obtener la alerta existente
      const alerta = await Alerta.findByPk(idAlerta);
  
      if (!alerta) {
        return res.status(404).json({ error: 'Alerta no encontrada' });
      }
  
      // Obtener el proyecto asociado
      const proyecto = await Proyectos.findByPk(idProyecto);
  
      if (!proyecto) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
      }
  
      // Calcular la diferencia en días entre la fechaFinal y la fecha actual
      const fechaFinal = new Date(proyecto.fechaFinal);
      const fechaHoy = new Date();
      const diferenciaEnDias = Math.ceil((fechaFinal - fechaHoy) / (1000 * 60 * 60 * 24));
  
      // Actualizar la descripción basada en los días restantes
      if (diferenciaEnDias <= 7) {
        alerta.descripcion = `Faltan ${diferenciaEnDias} días para la fecha final.`;
      } else {
        alerta.descripcion = `La fecha final está en ${diferenciaEnDias} días.`;
      }
  
      // Actualizar el resto de la alerta
      alerta.idProyecto = idProyecto || alerta.idProyecto;
  
      await alerta.save();
  
      res.status(200).json(alerta);
    } catch (error) {
      console.error('Error al actualizar la alerta:', error);
      res.status(500).json({ error: 'Error al actualizar la alerta' });
    }
};

// Eliminar una alerta por ID
module.exports.deleteAlerta = async (req, res) => {
  try {
    const { idAlerta } = req.params;
    const alerta = await Alerta.findByPk(idAlerta);

    if (!alerta) {
      return res.status(404).json({ error: 'Alerta no encontrada' });
    }

    await alerta.destroy();

    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error al eliminar la alerta:', error);
    res.status(500).json({ error: 'Error al eliminar la alerta' });
  }
};
