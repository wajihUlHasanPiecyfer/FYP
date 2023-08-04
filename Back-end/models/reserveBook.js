const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reserveBookSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    cancelReservation: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('ReserveBook', reserveBookSchema);