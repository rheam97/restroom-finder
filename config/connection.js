const Sequelize = require('sequelize');

require('dotenv').config({path: '../.env'});

// create connection to our db ** deleted env user and root
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });

    async function authenticate(){
      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }

  authenticate().then(()=> {
    console.log('yay')
  })

module.exports = sequelize;
