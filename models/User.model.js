const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
});

const User = model('User', userSchema);

module.exports = User;