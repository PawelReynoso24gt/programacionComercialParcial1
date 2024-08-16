'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Proyectos extends Model {
    static associate(models) {
      // Un proyecto puede tener múltiples asignaciones
      Proyectos.hasMany(models.Asignacion, {
        foreignKey: 'idProyecto'
      });
    }
  };

  Proyectos.init({
    idProyecto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nombreProyecto: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fechaInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fechaFinal: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    porcentaje: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Proyectos', // Nombre del modelo definido
    tableName: 'proyectos', // Nombre de la tabla
    timestamps: false, // Para no usar los campos createdAt y updatedAt
  });

  return Proyectos;
};
