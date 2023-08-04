const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv")
const connectDatabase = require("./config/databse.js")
const errorMiddleware = require("./middleware/error.js")
const cloudinary = require ("cloudinary")
const fileUpload = require ("express-fileupload")

//  Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`error: ${err.message}`)
    console.log(err.stack)
    console.log("Shutting down due to Handling uncaught exception")
    process.exit(1)
     console.log(youtube)
})


//config
dotenv.config({ path: "config/config.env" })

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// database connection
connectDatabase()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false,limit: '10mb' }))
app.use(cors())
app.use(cookieParser())
app.use(fileUpload())

//routes
const books = require("./routes/book.js")
const user = require("./routes/user.js");
const issues = require("./routes/issueBook.js")


app.use('/', books)
app.use('/', user)
app.use('/', issues)


// middleware for error
app.use(errorMiddleware)


const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`)
})

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`error: ${err.message}`)
    console.log("Shutting down due to unHandled Promise Rejection")

    server.close(() => {
        process.exit(1)
    })

})