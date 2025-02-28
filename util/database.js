const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('expense_db', 'root', 'rutuja@38', {
    dialect: 'mysql',
    host: 'localhost'
});
module.exports = sequelize;
