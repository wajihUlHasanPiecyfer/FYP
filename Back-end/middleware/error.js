const ErrorHandler = require("../utils/errorHandler")

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message =  err.stack|| err.message || "Internal Server Error"

    console.log(err)
    // mongodb id error
    if (err.name == "CastError") {
        const message = `Resourece not fount. Invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    // mongoodse duplicate email error
    if (err.code == 11000) {
        const message = `Email already exists`
        err = new ErrorHandler(message, 400)
    }

    // wrong JWT error
    if (err.name == "JsonWebTokenError") {
        const message = `Invalid json web token, Try again`
        err = new ErrorHandler(message, 401)
    }

    // JWT expire error
    if (err.name == "TokenExpiredError") {
        const message = `Token expired, Try again`
        err = new ErrorHandler(message, 401)
    }



    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}