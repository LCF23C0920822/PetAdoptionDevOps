// dbConnection.test.js
const mongoose = require('mongoose');

beforeAll(async () => {
  // Connect to MongoDB using the environment URI
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  // Close the connection after tests are done
  await mongoose.connection.close();
});

test('should connect to MongoDB', async () => {
  const state = mongoose.connection.readyState;
  expect(state).toBe(1);  // 1 means successful conection
});
