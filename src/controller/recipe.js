import mongoose from 'mongoose';
import { Router } from 'express';
import Recipe from '../model/recipe';
import Review from '../model/review';
import ImageUrl from '../model/image';
import bodyParser from 'body-parser';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();
  api.get('/', (req, res) => {
    Recipe.find({}, (err, recipes) => {
      if (err) {
        res.send(err);
      }
      res.json(recipes);
    });
  });

  // '/v1/recipe/:id' - GET a specific food truck
  api.get('/:id', (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
      if (err) {
        res.send(err);
      }
      res.json(recipe);
    });
  });

  // '/v1/recipe/add' - POST - add a food truck
  api.post('/add',authenticate, (req, res) => {
    let newRecipe = new Recipe();
    newRecipe.name = req.body.name;
    newRecipe.description=req.body.description;
    newRecipe.estimatedtime=req.body.estimatedtime;
    newRecipe.serves=req.body.serves;
    newRecipe.calories=req.body.calories;
    newRecipe.ingredients=req.body.ingredients;
    newRecipe.steps=req.body.steps;
    newRecipe.recipetype = req.body.recipetype;
    newRecipe.recipeCategory = req.body.recipeCategory;
    newRecipe.image=req.body.image;

    newRecipe.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Recipe saved successfully' });
    });
  });

  // '/v1/recipe/:id' - DELETE - remove a food truck
  api.delete('/:id', (req, res) => {
    Recipe.remove({
      _id: req.params.id
    }, (err, recipe) => {
      if (err) {
        res.send(err);
      }
      // res.json({message: "Recipe Successfully Removed"});
      Review.remove({
        recipe: req.params.id
      }, (err, review) => {
        if (err) {
          res.send(err);
        }
        res.json({message: "Recipe and Reviews Successfully Removed"});
      });
    });
  });

  // '/v1/recipe/:id' - PUT - update an existing record
  api.put('/:id', (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
      if (err) {
        res.send(err);
      }
      newRecipe.name = req.body.name;
      newRecipe.description=req.body.description;
      newRecipe.estimatedtime=req.body.estimatedtime;
      newRecipe.serves=req.body.serves;
      newRecipe.calories=req.body.calories;
      newRecipe.ingredients=req.body.ingredients;
      newRecipe.steps=req.body.steps;
      newRecipe.recipetype = req.body.recipetype;
      newRecipe.recipeCategory = req.body.recipeCategory;
      newRecipe.image=req.body.image;
      recipe.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Recipe info updated' });
      });
    });
  });

  //add a review by a specific foodtruck id
  //'/v1/recipe/reviews/add/:id'
  api.post('/reviews/add/:id', (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
      if (err) {
        res.send(err);
      }
      let newReview = new Review();
      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.recipe = recipe._id;
      newReview.save((err, review) => {
        if (err) {
          res.send(err);
        }
        recipe.reviews.push(newReview);
        recipe.save(err => {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Recipe review saved' });
        });
      });
    });
  });

  //get reviews for a specific recipe id
  //'/v1/recipe/reviews/:id'
  api.get('/reviews/:id', (req, res) => {
    Review.find({recipe: req.params.id}, (err, reviews) => {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  return api;
}
