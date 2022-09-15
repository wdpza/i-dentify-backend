import mongoose from 'mongoose';
/**
 * @private
 * @constant {Object} SosContactSchema
 */
const SosContactSchema = new mongoose.Schema({
  sub: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true,
  },
});

const SosContact = mongoose.model('SosContact', SosContactSchema)

export default SosContact
