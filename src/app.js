const express = require('express');
const cors = require('cors');
const routes = require('../src/routes/auth.routes'); 
const discoRoutes = require('../src/routes/disco.routes');  // Importa las rutas de discos
const sequelize = require('../src/config/database');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);


app.use('/api', discoRoutes); 

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Tablas sincronizadas");

    app.listen(3000, '0.0.0.0', () => {
      console.log('Servidor corriendo en ');
    });

  })
  .catch(err => console.error("Error sincronizando tablas:", err));
