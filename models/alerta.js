'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Alerta extends Model {
    static associate(models) {
      // Una asignación pertenece a un proyecto
      Alerta.belongsTo(models.Proyectos, {
        foreignKey: 'idProyecto'
      });
    }
  };

  Alerta.init({
    idAlerta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    idProyecto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Alerta', // Nombre del modelo definido
    tableName: 'alertas', // Nombre de la tabla
    timestamps: false, // Para no usar los campos createdAt y updatedAt
  });

  return Alerta;
};
