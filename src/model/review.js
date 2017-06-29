import mongoose from 'mongoose';
import Recipe from './recipe';
let Schema = mongoose.Schema;

let ReviewSchema = new Schema({
  title: String,
  text: String,
  recipe: {type: Schema.Types.ObjectId, ref: 'Recipe'}
});

module.exports = mongoose.model('Review', ReviewSchema);
