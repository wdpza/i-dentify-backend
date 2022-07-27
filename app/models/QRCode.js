import mongoose from 'mongoose';

/**
 * @private
 * @constant {Object} QRCodeSchema
 *
 * @type {Object}
 * @property {String} uid - Unique id
 * @property {ObjectId} user - User id
 *
 * @property {Object} metaData.key - Key
 * @property {Object} metaData.value - Value
 */
const QRCodeSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  sub: {
    type: String,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  accessToken: {
    type: String,
    required:true
  },
  category: {
    type: String,
    required: true,
    default: 'private'
  },
});

const QRCode = mongoose.model('QRCode', QRCodeSchema);

export default QRCode;
