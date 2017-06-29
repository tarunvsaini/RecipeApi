import mongoose from 'mongoose';
import Recipe from './recipe';
let Schema = mongoose.Schema;

let ImageSchema = new Schema({
  imageUrl: String,
  recipe: {type: Schema.Types.ObjectId, ref: 'Recipe'}
});

module.exports = mongoose.model('ImageUrl', ImageSchema);
