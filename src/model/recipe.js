import mongoose from 'mongoose';
import Review from './review';
import ImageUrl from './image'

let Schema = mongoose.Schema;

let RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  estimatedtime: String,
  serves: Number,
  calories: Number,
  ingredients: [
    {quantity: Number,
    measure: String,
      ingredient: String}],
  steps: [{type: String, required: true}],
  recipetype:String,
  recipeCategory: String,
  reviews: [{type: Schema.Types.ObjectId , ref: 'Review'}],
  image:String
  // avgcost: Number,
  // geometry: {
  //   type: { type: String, default: 'Point' },
  //   coordinates: [Number]
  // },
  // imageUrl:{type: Schema.Types.ObjectId, ref: 'ImageUrl'},

});

module.exports = mongoose.model('Recipe', RecipeSchema);
