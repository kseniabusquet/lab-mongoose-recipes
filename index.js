const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    //Iteration 2
    const omeletteRecipe =  {
      title: 'Omelette with cheese and tomatoes',
      level: 'Easy Peasy',
      ingredients: ['eggs', 'cheese', 'milk', 'salt', 'tomatoes', 'butter'],
      cuisine: 'European',
      dishType: 'breakfast',
      duration: 15,
      creator: 'Ksenia'
    }

    Recipe.create(omeletteRecipe)
      .then (omeletteRecipe => {
        console.log(`Created ${omeletteRecipe} recipe`)
      })
      .catch (err => console.log(err));

      //Iteration 3

      Recipe.insertMany(data)
       .then(recipes => {
        recipes.forEach(recipe => console.log(recipe.title));

        Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {$set: {duration: 100}})
        .then(recipe => console.log('Updated successfully'))
        .catch(err => console.log(err));

        Recipe.deleteOne({title:'Carrot Cake'})
        .then(recipe => console.log('Removed successfully'))
        .catch(err => console.log(err));
      })
       .catch(err => console.log(err));

       //Iteration 4

       Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {$set: {duration: 100}})
        .then(recipe => console.log('Updated successfully'))
        .catch(err => console.log(err));

        //Iteration 5

      Recipe.deleteOne({title:'Carrot Cake'})
      .then(recipe => console.log('Removed successfully'))
      .catch(err => console.log(err));
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
