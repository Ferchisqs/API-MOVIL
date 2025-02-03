const sequelize = require('../src/config/database'); 
const User = require('../src/models/User'); 

sequelize.sync()
  .then(() => console.log('Base de datos y tablas creadas'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));
