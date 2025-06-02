const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  city: { type: String },
  coins: { type: Number, default: 0 },
  isPremium: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
