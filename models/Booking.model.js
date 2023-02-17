const { Schema, model } = require ('mongoose')

const bookingSchema = new Schema(
    {
        property: { 
        type: Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    //     user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
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

const Booking = model('Booking', bookingSchema);

module.exports = Booking;
