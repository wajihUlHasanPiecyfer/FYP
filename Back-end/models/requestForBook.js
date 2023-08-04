const  mongoose =require ("mongoose");

const requestForBookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,"Please enter a book name"],
        maxLength: [40, "Name cannot exceed 50 characters"],
        minLength: [4, "Name cannot be less than 4 characters"]
    },
    author: {
        type: String,
        required: [true,"Please enter a book author"],
        maxLength: [40, "Author cannot exceed 40 characters"],
        minLength: [4, "Author cannot be less than 4 characters"]
    },
    publisher:{
        type: String,
        required: [true,"Please enter a book publisher"],
        maxLength: [40, "Publisher cannot exceed 40 characters"],
        minLength: [4, "Publisher cannot be less than 4 characters"]
    },
    edition:{
        type: Number,
        maxValue: [20, "Edition cannot exceed 20 number"],
    }, 
    requestedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    requestDate: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model("RequestedBooks",requestForBookSchema)