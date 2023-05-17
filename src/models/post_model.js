import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
export const PostSchema = new Schema({
  title: String,
  tags: [String],
  content: String,
  coverUrl: String,
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// create PostModel class from schema
const PostModel = mongoose.model('Post', PostSchema);
export default PostModel;
