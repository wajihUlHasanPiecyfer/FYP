const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    issueDate: {
        type: Date,
        default: Date.now()
    },
    returnDate: {
        type: Date,
        default: Date.now()
    },
    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    returned: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
var Issues = mongoose.model('Issue', issueSchema);

module.exports = Issues;