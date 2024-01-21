const Sequelize = require('sequelize');

const sequelize = new Sequelize('appointment-app', 'root', 'ruchita123@', {
    dialect: 'mysql',
    host: 'localhost'
  });
  
  module.exports = sequelize;