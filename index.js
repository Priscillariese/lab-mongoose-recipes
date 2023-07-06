const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
   // Iteration 2 - create recipe
   .then(() => {
    const recipe = { title: 'Recipe01', cuisine: 'German'};
    return Recipe.create(recipe);
  })
  .then(() => {
    // Interation 3 - Insert all recipes from the data array
    return Recipe.insertMany(data);
  })
  .then(() => {
    // Iteration 4 - Update recipe
    const filter = { title: 'Rigatoni alla Genovese' };
    const update = { duration: 100 };
    return Recipe.findOneAndUpdate(filter, update);
  })
  .then(() => {
    // Iteration 5-  Remove a recipe
    console.log('Recipe updated successfully');
    const filter = { title: 'Carrot Cake' };
    return Recipe.deleteOne(filter);
  })
  .then(() => {
    console.log('Recipe removed successfully');
    return mongoose.connection.close();
  })
  // Iteration 6- Close the Database
  .then(() => {
    console.log('Database connection closed');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });