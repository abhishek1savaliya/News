const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'employee', 'user'], default: 'user' }, // Changed default to 'user'
  fName: { type: String, required: true },
  lName: { type: String },
  email: { type: String, required: true, unique: true },
  subscribedTopic: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic'
  }],
  likedNews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }],
  dislikedNews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }],
  joinDate: {
    type: Date,
    default: Date.now 
  }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', UserSchema);