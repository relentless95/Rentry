const reviewSchema = new Schema({
    renter: { type: Schema.Types.ObjectId, ref: 'User' },
    property: { type: Schema.Types.ObjectId, ref: 'Property' },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    comment: {
      type: String,
      required: true
    }
  });
  
const Review = model('Review', reviewSchema);

module.exports = Review;