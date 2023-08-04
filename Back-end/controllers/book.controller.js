const Book = require("../models/books")
const User = require("../models/users")
const ReserveBook = require("../models/reserveBook")
const RequestedBook = require("../models/requestForBook")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const apiSearch = require("../utils/apiSearch")
const cloudinary = require("cloudinary").v2


// // Get All Books
// exports.getAllBooks = catchAsyncError(async (req, res) => {
//     const apiSearch = new ApiSearch(Book.find(),req.query).search()
//     const allBooks = await apiSearch.query
//     res.status(200).json({
//         success: true,
//         allBooks
//     })
// })

// Get All Books

exports.getAllBooks = catchAsyncError(async (req, res, next) => {
    const resultPerPage = 4;
    const totalBooksCount = await Book.estimatedDocumentCount().exec();

    const apiFeatures = new apiSearch(Book.find(), req.query)
        .search()
        .filter();

    const book = await apiFeatures.query.lean();
    const filteredBooksCount = book.length;

    const apiFeature = new apiSearch(Book.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage)

    const books = await apiFeature.query;

    res.status(200).json({
        success: true,
        books,
        booksCount: totalBooksCount,
        resultPerPage,
        filteredBooksCount,
    });
});



// serach Books for issuing -- Admin

exports.getBooksForIssuing = catchAsyncError(async (req, res, next) => {
    const keyword = req.params.id;

    const books = await Book.find({
        "$or": [
            { title: { $regex: keyword, $options: 'i' } },
            { publisher: { $regex: keyword, $options: 'i' } },
            { author: { $regex: keyword, $options: 'i' } },
            // { _id: keyword },
        ]
    })
    res.status(200).json({
        success: true,
        books,
    });

})
// Get All Books -- Admin

exports.getAdminBooks = catchAsyncError(async (req, res, next) => {

    const books = await Book.find()
    res.status(200).json({
        success: true,
        books,
    });

})

// Get Single Book
exports.getSingleBook = catchAsyncError(async (req, res, next) => {
    const book = await Book.findById(req.params.id)

    if (!book) {
        return next(new ErrorHandler("Book Not Found", 404))
    }
    res.status(200).json({
        success: true,
        book
    })
})

// create a book --- Admin route
exports.createBook = catchAsyncError(async (req, res, next) => {
    let images = []
    if (!req.body.images) {
        return next(new ErrorHandler("Please enter Cover Image", 400))
    } if (!req.body.ISBN) {
        return next(new ErrorHandler("Please enter ISBN", 400))
    } if (!req.body.catagory) {
        return next(new ErrorHandler("Please select Category", 400))
    } if (!req.body.title) {
        return next(new ErrorHandler("Please enter Book Title", 400))
    } if (!req.body.author) {
        return next(new ErrorHandler("Please enter Author", 400))
    } if (!req.body.publisher) {
        return next(new ErrorHandler("Please enter Publisher", 400))
    } if (!req.body.edition) {
        return next(new ErrorHandler("Please enter Book Edition", 400))
    } if (!req.body.quantity) {
        return next(new ErrorHandler("Please enter Book Quantity", 400))
    } if (!req.body.shelfNumber) {
        return next(new ErrorHandler("Please enter Shelf Number", 400))
    } if (!req.body.cabnotNumber) {
        return next(new ErrorHandler("Please enter Cabnot Number", 400))
    }

    images.push(req.body.images)

    const imagesLink = []
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: "books"
        })

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLink
    req.body.createdBy = req.user.id

    const newBook = (await Book.create(req.body))
    res.status(201).json({
        success: true,
        newBook
    })

})

// Update a book --- Admin route
exports.updateBook = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
        return next(new ErrorHandler("Book Not Found", 404));
    }

    // Handle book images update
    if (req.body.images && Array.isArray(req.body.images) && req.body.images.length > 0) {
        // First, delete the old images from Cloudinary
        for (const image of book.images) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        // Now, upload the new images to Cloudinary
        const imagesLink = [];
        for (const image of req.body.images) {
            const result = await cloudinary.uploader.upload(image, {
                folder: "books",
            });

            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // Update the book's images array with the new images
        req.body.images = imagesLink;
    }

    // Update the book with the new data
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Book updated Successfully.",
        book: updatedBook,
    });
});

// Delete a book --- Admin route
exports.deleteBook = catchAsyncError(async (req, res, next) => {
    const book = await Book.findById(req.params.id)
    if (!book) {
        return next(new ErrorHandler("Book Not Found", 404))

    }

    // Deleting images from Cloudinary
    for (let i = 0; i < book.images.length; i++) {
        await cloudinary.uploader.destroy(
            book.images[i].public_id
        )

    }

    await book.deleteOne()
    res.status(200).json({
        success: true,
        message: 'Book deleted succesfully'
    })

})


// request book by user
exports.requestBookByUser = catchAsyncError(async (req, res) => {
    req.body.requestedby = req.user.id
    const request = await RequestedBook.create(req.body)


    res.status(201).json({
        success: true,
        message: `Your request for Book has been sent to Admin`
    })
})


// requested books by user -- Admin
exports.getAllrequestedBooks = catchAsyncError(async (req, res) => {
    const requestedBooks = await RequestedBook.find().populate({ path: "requestedby", select: "name" })

    res.status(200).json({
        success: true,
        requestedBooks
    })
})

exports.deleteRequestedBook = catchAsyncError(async (req, res, next) => {
    const requestedBook = await RequestedBook.findById(req.params.id);

    if (!requestedBook) {
        return next(new ErrorHandler('Requested book not found', 404));
    }
    await requestedBook.deleteOne()

    res.status(200).json({
        success: true,
        message: 'Requested Book deleted succesfully'

    });
});


exports.reserveBook = catchAsyncError(async (req, res, next) => {
    req.body.userId = req.user.id
    req.body.bookId;

    // Check book availability
    const book = await Book.findById(req.body.bookId);
    if (!book) {
        return next(new ErrorHandler('Book not found', 404))
    }

    // Check user reservation limit
    const user = await User.findById(req.body.userId);
    if (!user) {
        return next(new ErrorHandler('User not found', 404))
    }
    if (user.reservedBooks.length > 3) {
        return next(new ErrorHandler('User has reached the reservation limit', 400))
    }

    // Check if the user has already reserved this book
    const isBookReserved = user.reservedBooks.some((reservedBook) =>
        reservedBook.book.equals(req.body.bookId)
    );

    if (isBookReserved) {
        return next(new ErrorHandler('Book already reserved by the user', 400))
    }

    const reserve = await ReserveBook.create(req.body)

    // Update user's reservedBooks
    user.reservedBooks.push({
        book: req.body.bookId,
        reservedDate: new Date(),
    });

    user.chat.push({
        message: `You have reserved ${book.title} book. You can take this book by ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toDateString(0, 10)} except Saturday and Sunday. Library Time is between (9am to 3pm). If you have any queries, please contact us at email@example.com.`
    });

    await user.save();

    // Send response
    res.status(200).json({
        success: true,
        message: 'Book reserved successfully'
    });

});


// Get All Issued Books
exports.getAllReservedBook = catchAsyncError(async (req, res, next) => {
    const reservedBooks = await ReserveBook.find().populate({ path: "userId" })
        .populate({ path: "bookId", select: "title" })

    if (!reservedBooks) {
        return next(new ErrorHandler("Issued Books not found", 404))
    }
    res.status(200).json({
        success: true,
        reservedBooks
    })

})

exports.deleteReservedBook = catchAsyncError(async (req, res, next) => {
    const reservedBook = await ReserveBook.findById(req.params.id);

    if (!reservedBook) {
        return next(new ErrorHandler('Reserved book not found', 404));
    }

    const user = await User.findById(reservedBook.userId);
    user.reservedBooks = user.reservedBooks.filter((reservedBookItem) => reservedBookItem.book.toString() !== reservedBook.bookId.toString());
    await user.save();

    await reservedBook.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Reserved Book deleted successfully',
    });
});


exports.cancelReservation = catchAsyncError(async (req, res, next) => {
    const { reservationId } = req.params;
    const userId = req.body.userId;

    console.log(userId)

    const reservation = await ReserveBook.findById(reservationId)

    if (!reservation) {
        return next(new ErrorHandler('Reservation not found', 404));
    }

    const user = await User.findById(userId);
    user.reservedBooks = user.reservedBooks.filter(
        (reservedBook) => !reservedBook.book.equals(reservation.bookId)
    );
    user.chat.push({
        message: `Your reservation of book has been cancled. You can take this book by ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toDateString(0, 10)} except Saturday and Sunday. Library Time is between (9am to 3pm). If you have any queries, please contact us at email@example.com.`
    });
    await user.save();


    reservation.cancelReservation = true;
    await reservation.save();

    res.status(200).json({
        success: true,
        message: 'Reservation canceled successfully',
    });
});


