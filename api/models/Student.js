const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const Student = sequelize.define('student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
  },
});

module.exports = Student;