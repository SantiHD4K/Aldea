const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Importa el modelo de usuario
const { Op } = require('sequelize'); // Importa los operadores de Sequelize
const router = express.Router();

// Ruta de edición de usuario
router.put('/update', async (req, res) => {
    const { userId, name, email, cedula, apellidos, fechaNacimiento, tipoResidencia, numeroResidencia } = req.body;
  
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      const existingEmailUser = await User.findOne({ where: { email, id: { [Op.ne]: userId } } });
      if (existingEmailUser) {
        return res.status(400).json({ error: 'El correo electrónico ya está en uso por otro usuario' });
      }
  
      const existingCedulaUser = await User.findOne({ where: { cedula, id: { [Op.ne]: userId } } });
      if (existingCedulaUser) {
        return res.status(400).json({ error: 'La cédula ya está en uso por otro usuario' });
      }
  
      await user.update({
        name,
        email,
        cedula,
        apellidos,
        fechaNacimiento,
        tipoResidencia,
        numeroResidencia,
      });
  
      res.status(200).json({ message: 'Perfil actualizado exitosamente', user });
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  });  

module.exports = router;
