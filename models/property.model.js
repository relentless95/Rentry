const propertySchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    images: {
      type: [String],
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    bedrooms: {
      type: Number,
      required: true
    },
    bathrooms: {
      type: Number,
      required: true
    },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
  });
  
const Property = model('Property', propertySchema);

module.exports = Property;