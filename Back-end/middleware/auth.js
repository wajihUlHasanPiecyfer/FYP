const jwt = require("jsonwebtoken")
const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/errorHandler")
const User = require("../models/users")

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler("Please login to access these resources", 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decodedData.id)

    next()
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`ROLE: ${req.user.role} is not allowed to access this resouce`, 403)
            )
        }
        next()
    }
}