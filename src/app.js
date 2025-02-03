const express = require('express');
const cors = require('cors');
const routes = require('./routes/auth.routes'); 
const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();


app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

sequelize.sync({ alter: true })
  .then(() => {
    console.log("🔄 Tablas sincronizadas");

    app.listen(3000, '0.0.0.0', () => {
      console.log('Servidor corriendo en http://0.0.0.0:3000');
    });

  })
  .catch(err => console.error("Error sincronizando tablas:", err));
