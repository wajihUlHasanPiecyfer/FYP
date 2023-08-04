const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const User = require("../models/users")
const Feedback = require("../models/userFeedback")
const { sendToken } = require("../utils/jwtTokens")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary = require("cloudinary").v2


// Rsgister a user
exports.registerUser = catchAsyncError(async (req, res, next) => {

    const { name, email, password } = req.body


    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: '',
            url: '',
        },
    })

    sendToken(user, 201, res)
    // const token = user.getJWTToken()
    // res.status(201).json({
    //     success: true,
    //     token,
    // })

})



// Login a user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body

    // check is user and password exist
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Invalid email and password", 401))
    }

    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid user and password", 401))
    }

    sendToken(user, 200, res)
    // const token = user.getJWTToken()

    // res.status(200).json({
    //     success: true,
    //     token,
    // })


})



// logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "logged out successfully",
    })
})



// Forget Password
exports.forgetPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorHandler("User not foend", 404))
    }
    // get reset token
    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })

    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`
    const resetPasswordUrl = `http://localhost:3001/password/reset/${resetToken}`


    const message = `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link to reset your password:\n\n
        ${resetPasswordUrl}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`

    try {
        await sendEmail({
            email: user.email,
            subject: "Scholer's Library Password Reset Request",
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent  to ${user.email} successfully`,
        })
    } catch (error) {
        user.resetPasswordToken = undefined,
            user.resetPasswordExpire = undefined

        user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }
})



// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // created token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return next(new ErrorHandler("Password reset token is invalid or has expired", 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user, 200, res)
})



// get user details
exports.getUserDetails = catchAsyncError(async (req, res) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
})

// get user chats
exports.getUserChats = catchAsyncError(async (req, res) => {
    const user = await User.findById(req.user.id)
    const chats = user.chat
    res.status(200).json({
        success: true,
        chats
    })
})


// delete user chats
exports.deleteChat = catchAsyncError(async (req, res) => {
    const chatId = req.params.chatId;
    const userId = req.user.id;

    // Find the user
    const user = await User.findById(userId);

    // Check if the chat message exists and belongs to the user
    const chatIndex = user.chat.findIndex((chat) => chat._id.toString() === chatId);
    if (chatIndex === -1) {
        return next(new ErrorHandler("Chat message not found", 404))
    }

    // Remove the chat message from the user's chat array
    user.chat.splice(chatIndex, 1);

    // Save the updated user
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Chat message deleted successfully'
    });
});



// update user password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400))
    }

    user.password = req.body.newPassword

    await user.save()

    sendToken(user, 200, res)
})



// Update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const { name, email, education, phoneNumber, address, avatar } = req.body;

    const newUserData = {
        name,
        email,
        education,
        phoneNumber,
        address,
        role
    };

    if (avatar && req.body.avatar !== "") {
        const user = await User.findById(req.user.id);

        // Check if user.avatar exists and has the public_id property
        if (user.avatar && user.avatar.public_id) {
            const imageId = user.avatar.public_id;
            await cloudinary.uploader.destroy(imageId);
        }

        const myCloud = await cloudinary.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
    });
});



// get all users  -- Admin
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({
        success: true,
        users
    })
})


// serach users for issuing -- Admin
exports.getUsersForIssuing = catchAsyncError(async (req, res, next) => {
    const keyword = req.params.id;

    const users = await User.find({
        "$or": [
            { name: { $regex: keyword, $options: 'i' } },
        ]
    })
    res.status(200).json({
        success: true,
        users,
    });

})

// get single user details -- Admin
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler("User not found", 400))
    }
    res.status(200).json({
        success: true,
        user
    })
})



// update user role -- Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user

    });
});


// Delete user -- Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User does not exist with ID : ${req.params.id}`, 400))
    }
    if (user.avatar.public_id) {

        const imageId = user.avatar.public_id;
        await cloudinary.uploader.destroy(imageId);
    }

    await user.deleteOne()

    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    })
})


// feedback by user 
exports.sendFeedback = catchAsyncError(async (req, res, next) => {
    const {name, email, feedback } = req.body;

    if (!name || !email || !feedback) {
        return res.status(400).json({
          success: false,
          message: 'Please provide name, email, and feedback.',
        });
      }

    const feedBack = await Feedback.create({name, email, feedback})
    res.status(200).json({
        success: true,
        message: 'Feedback sent successfully',
    })
})


// get all feedback -- Admin
exports.getAllFeedback = catchAsyncError(async (req, res, next) => {
    const feedbacks = await Feedback.find()
    res.status(200).json({
        success: true,
        feedbacks
    })
})

// deletee feedback -- Admin
exports.deleteFeedback = catchAsyncError(async (req, res, next) => {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
        return next(new ErrorHandler('Feedback not found', 404))
    }

    await feedback.deleteOne();

    res.status(200).json({
        success: true,
        message: "FeedBack deleted successfully."
    })
})
