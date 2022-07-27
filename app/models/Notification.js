import mongoose from 'mongoose';

// NotificationSchema
const NotificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  recipient: {
    type: Object,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
},{
  timestamps: true,
});

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;