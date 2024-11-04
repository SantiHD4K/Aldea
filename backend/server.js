require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./database/connection');
const app = express();
const PORT = process.env.PORT || 5000;

// Configurar CORS para permitir solicitudes desde http://localhost:8081
app.use(cors({
  origin: 'http://localhost:8081', // Reemplaza con el origen de tu aplicación
}));

// Middleware para manejar JSON
app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/auth');
const editRoutes = require('./routes/edit');
const serviceRoutes = require('./routes/services');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/edit', editRoutes);
app.use('/api/services', serviceRoutes);


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Autenticar y sincronizar la base de datos, luego iniciar el servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos SQL');
    return sequelize.sync(); // Sincronizar modelos
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(`API Base URL: ${process.env.API_BASE_URL}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar o sincronizar la base de datos:', err);
    process.exit(1); // Salir del proceso si hay un error
  });
