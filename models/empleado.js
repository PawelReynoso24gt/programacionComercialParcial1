'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Empleados extends Model {
    static associate(models) {
      // Un empleado puede tener múltiples asignaciones
      Empleados.hasMany(models.Asignacion, {
        foreignKey: 'idEmpleado'
      });
    }
  };

  Empleados.init({
    idEmpleado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nombreEmpleado: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Empleados', // Nombre del modelo definido
    tableName: 'empleados', // Nombre de la tabla
    timestamps: false, // Para no usar los campos createdAt y updatedAt
  });

  return Empleados;
};
