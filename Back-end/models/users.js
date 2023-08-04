
const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name"],
        maxLength: [40, "Name cannot exceed 40 characters"],
        minLength: [4, "Name cannot be less than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email address"],
        unique: true,
        valiadte: [validator.isEmail, "Please enter a valid email address"],
    },
    education: {
        type: String,
        maxLength: [40, "Education cannot exceed 40 characters"],
        // minLength: [4, "Education cannot be less than 4 characters"],
        default: ""

    },
    phoneNumber: {
        type: String,
        maxLength: [13, "Phone number cannot exceed 15 characters"],
        // minLength: [7, "Phone number cannot be less than 10 characters"],
        default: ""
    },
    address: {
        type: String,
        default: ""

    },
    password: {
        type: String,
        required: [true, "Please enter your Passwrd"],
        minLength: [8, "Password cannot be less than 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },

    role: {
        type: String,
        default: "user"
    },
    feedback: {
        type: String,
        minLength: [4, "Feedback cannot be less than 4 characters"]
    },

    reservedBooks: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
        reservedDate: {
            type: Date,
            default: Date.now,
        },
    }],
    borrowedBooks: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
        borrowDate: {
            type: Date,
            default: Date.now,
        },
    }],


    chat: [
        {
            message: {
                type: String,
            },
            reservedDate: {
                type: Date,
                default: Date.now,
            },
        },
    ],

    resetPasswordToken: String,
    resetPasswordExpire: Date,


}, {
    timestamps: true
});


// password encryption
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Generating reset password and token
userSchema.methods.getResetPasswordToken = function () {
    // generating reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and addind resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
};
module.exports = mongoose.model('User', userSchema);