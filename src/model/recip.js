import mongoose from 'mongoose';
import Comment from './comment'
import ImageUrl from './image'

let Schema = mongoose.Schema;

let RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  estimatedtime: Number,
  serves: Number,
  calories: Number,
  imageUrl:{type: Schema.Types.ObjectId, ref: 'ImageUrl'},
  ingredients: [{type: String, required: true}],
  steps: [{type: String, required: true}],
  recipetype: {
    type: String,
    required: true
  },
  recipeCategory: {
    type: String,
    required: true
  },
  avgcost: Number,
  geometry: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('Recipe', RecipeSchema);
