import mongoose from 'mongoose';

// UserSchema
const UserSchema = new mongoose.Schema({
  sub: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: Array,
    default: [{
      street: '',
      city: '',
      province: '',
      postalCode: '',
    }],
  },
  role: {
    type: String,
    default: 'user',
  },
  metaData: {
    type: Object,
    required: true,
  },
  notifications: {
    type: Array,
    default: [],
  },
},{
  timestamps: true,
});

const User = mongoose.model('User', UserSchema);

export default User;