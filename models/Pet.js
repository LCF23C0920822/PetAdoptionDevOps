const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    namePet: String,
    type: String, 
    age: Number,
    breed: String,
    description: String,
    imagePath: String 
});

module.exports = mongoose.model('Pet', PetSchema, 'pets');

//Primer argumento ('Pet'): Es el nombre lógico del modelo dentro del código.
//Segundo argumento (PetSchema): Define cómo debe ser la estructura de los documentos en la colección pets
//Tercer argumento ('pets'): Es el nombre exacto de la colección en MongoDB