require('dotenv').config(); // Load environment variables from .env
const mongoose = require('mongoose');
const Pet = require('../models/Pet'); // Asegúrate de que la ruta al modelo Pet sea correcta

beforeAll(async () => {
  // Connect to MongoDB using the environment URI
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  // Close the connection after tests are done
  await mongoose.connection.close();
});

test('should fetch all pets', async () => {
  // Perform the GET request to fetch all pets
  const pets = await Pet.find();
  
  // Check if the result is an array and that it has at least one pet
  expect(Array.isArray(pets)).toBe(true);  // Ensure the response is an array
  expect(pets.length).toBeGreaterThan(0);  // Ensure that the array is not empty
});
