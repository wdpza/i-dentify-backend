import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
  title: {
    type: String,
  },
  path: {
    type: String,
    required: true,
  },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Image = mongoose.model('Image', imageSchema);

export default Image;