const Sequelize = require('sequelize');
const sequelize = new Sequelize('workload', 'root',"", {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.authenticate().then(function (err) {
 if (err) {
    console.log('There is connection in ERROR');
 } else {
    console.log('Connection has been established successfully');
 }
});
module.exports= sequelize;