'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Asignacion extends Model {
    static associate(models) {
      // Una asignación pertenece a un empleado
      Asignacion.belongsTo(models.Empleados, {
        foreignKey: 'idEmpleado'
      });

      // Una asignación pertenece a un proyecto
      Asignacion.belongsTo(models.Proyectos, {
        foreignKey: 'idProyecto'
      });
    }
  };

  Asignacion.init({
    idAsignacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    fechaAsignacion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    idEmpleado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idProyecto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Asignacion', // Nombre del modelo definido
    tableName: 'asignacion', // Nombre de la tabla
    timestamps: false, // Para no usar los campos createdAt y updatedAt
  });

  return Asignacion;
};
