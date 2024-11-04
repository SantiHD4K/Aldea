const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

router.get('/', async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (error) {
        console.error('Error al obtener los servicios:', error);
        res.status(500).json({ error: 'Error al obtener los servicios' });
    }
});

module.exports = router;
