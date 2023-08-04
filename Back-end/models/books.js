const mongoose = require("mongoose");


const bookschema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please enter the tiltle of the book"]
    },
    author: {
        type: String,
        required: [true, "please enter the author of the book"]
    },
    publisher: {
        type: String,
        required: [true, "please enter the publisher of the book"]
    },
    catagory: {
        type: String,
        enum: ['Technology', 'Computer Science', 'Science', 'Religion', 'Business', 'Literature',
            'Management', 'Electronics', 'Physics', 'Chemistry', 'Mathematics', 'Fiction', 'Romance',
            'Philosophy', 'Language', 'Arts', 'Other'],
        required: [true, "please enter the catagory of the book"]
    },
    ISBN: {
        type: Number,
        required: [true, "please enter the ISBN of the book"],
        value: {
            max: [13 || 10, "isbn number can be 10 or 13"]
        }
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    edition: {
        type: Number,
        min: 1,
        max: 1000
    },
    quantity: {
        type: Number,
        required: [true, "please enter the quantity no. of the book"],
        maxlength: [3, "cannot be more then length"]
    },
    shelfNumber: {
        type: Number,
        required: [true, "please enter the shelf no. of the book"],
        maxlength: [2, "cannot be more then length"]

    },
    cabnotNumber: {
        type: Number,
        required: [true, "please enter the cabnot no. of the book"],
        maxlength: [2, "cannot be more then length"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reservedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]

}, {
    timestamps: true
})

module.exports = mongoose.model("Book", bookschema)
