const { Schema, model } = require ('mongoose')

const bookingSchema = new Schema(
    {
        property: { 
        type: Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
        propertyName: {
            type: String,
        },

        user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
        checkIn: {
        type: Date,
        required: true
    },
        checkOut: {
        type: Date,
        required: true
    },
    }
)

bookingSchema.pre('find', function() {
    this.populate('property', 'name');
  });
  
const Booking = model('Booking', bookingSchema);

module.exports = Booking;
