const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const University = sequelize.define('university', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
  },
});

module.exports = University;