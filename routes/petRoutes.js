const express = require('express');
const Pet = require('../models/Pet');

const router = express.Router();



// Add new pet
router.post('/pets', async (req, res) => {
    try {
        const pet = new Pet(req.body);
        await pet.save();
        res.status(201).send(pet);
    } catch (err) {
        res.status(400).send(err);
    }
});

// codigo inicial que obtiene a todas las mascotas
/*router.get('/pets', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.send(pets);
    } catch (err) {
        res.status(500).send(err);
    }
});*/

// Filtra por tipo de mascota
router.get('/pets', async (req, res) => {
    const { type } = req.query; // Obtiene el tipo de mascota desde los parámetros de consulta
    try {
        let query = {};
        if (type) {
            query.type = type; // Filtra por tipo de mascota
        }
        const pets = await Pet.find(query); // Aplica el filtro si se proporcionó el tipo
        res.send(pets);
    } catch (err) {
        res.status(500).send(err);
    }
});



//Obtiene una mascota por su ID, la ruta  /adopt/:id   debe coincidir en el frontend
router.get('/adopt/:id', async (req, res) => {
    try {
        console.log('Servidor dice-parametro recibido:', req.params)
        const pet = await Pet.findById(req.params.id); 
        if (!pet) {
            return res.status(404).send({ message: 'Pet not found' }); 
        }
        res.send(pet); 
    } catch (err) {
        res.status(500).send(err); 
    }
});

// Delete Pets - la ruta  /pets/:id   debe coincidir en el frontend
router.delete('/pets/:id', async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Pet
router.put('/updatePet/:id', async (req, res) => {
    try 
    {
        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(pet);
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;
