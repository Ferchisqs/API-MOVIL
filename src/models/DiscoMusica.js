const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DiscoMusica = sequelize.define('DiscoMusica', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artista: {
    type: DataTypes.STRING,
    allowNull: false
  },
  anio_lanzamiento: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'DiscosMusica'
});

module.exports = DiscoMusica;
