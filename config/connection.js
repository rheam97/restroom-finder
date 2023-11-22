const Sequelize = require('sequelize');
const path = require('path');

require('dotenv').config({path: '../.env'});


const connection = {
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  host: process.env.DB_HOST,
};

const connectionString= `mysql://${connection.user}:${connection.password}@${connection.host}/restroom_finder_db`

// create connection to our db ** deleted env user and root
const sequelize = new Sequelize(connectionString, { dialect: "mysql2", dialectOptions: { ssl: {} } })
  // : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  //     host: 'localhost',
  //     dialect: 'mysql',
  //     port: 3306
  //   });

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
