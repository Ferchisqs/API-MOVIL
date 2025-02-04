require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('../src/routes/auth.routes'); 
const discoRoutes = require('../src/routes/disco.routes');  
const sequelize = require('../src/config/database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', routes);
app.use('/api', discoRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: process.env.NODE_ENV !== 'production' })
  .then(() => {
    console.log("Tablas sincronizadas correctamente");

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

  })
  .catch(err => console.error("Error sincronizando tablas:", err));
