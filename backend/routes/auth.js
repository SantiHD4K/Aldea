const express = require('express');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { Op } = require('sequelize');
const User = require('../models/User');
const router = express.Router();

// Ruta de registro
router.post('/register', async (req, res) => {
  const { name, email, password, cedula, apellidos, fechaNacimiento, tipoResidencia, numeroResidencia } = req.body;

  if (!name || !email || !password || !cedula || !apellidos || !fechaNacimiento) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Email no válido' });
  }

  try {
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { cedula }] }
    });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      cedula,
      apellidos,
      fechaNacimiento,
      tipoResidencia,
      numeroResidencia
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: user.id, name: user.name });
  } catch (error) {
    console.error('Error al registrar el usuario:', error.message || error);
    res.status(500).json({ error: 'Error al registrar el usuario', details: error.message || error });
  }

});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  try {
    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'name', 'email', 'password', 'cedula', 'apellidos', 'fechaNacimiento', 'tipoResidencia', 'numeroResidencia'],
    });

    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      userId: user.id,
      name: user.name,
      email: user.email,
      cedula: user.cedula,
      apellidos: user.apellidos,
      fechaNacimiento: user.fechaNacimiento,
      tipoResidencia: user.tipoResidencia,
      numeroResidencia: user.numeroResidencia,
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
});


module.exports = router;
