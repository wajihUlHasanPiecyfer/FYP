const Book = require("../models/books")
const User = require("../models/users")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const IssueBooks = require("../models/issueBook")


// Get All Issued Books
exports.getAllIssueBook = catchAsyncError(async (req, res, next) => {
  const issueBooks = await IssueBooks.find().populate({ path: "user", select: "name" })
    .populate({ path: "book" })

  if (!issueBooks) {
    return next(new ErrorHandler("Issued Books not found", 404))
  }
  res.status(200).json({
    success: true,
    issueBooks
  })

})


// Create Issued Book
exports.createIssueBook = catchAsyncError(async (req, res, next) => {
  const book = await Book.findById(req.body.book);
  const user = await User.findById(req.body.user);

  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const issues = await IssueBooks.find({ user: req.body.user });
  const notReturned = issues.filter((issue) => !issue.returned);

  if (notReturned.length >= 3) {
    return next(
      new ErrorHandler(
        "The user has already issued 3 books. Please return them first",
        400
      )
    );
  }

  if (user.reservedBooks.length === 3) {
    return next(
      new ErrorHandler(`${user.name} alredy have reserved three books. Maximum reservation allowed is only three`, 409)
    )
  }

  if (book.quantity === 0) {
    return next(
      new ErrorHandler(
        "The book is not available. You can wait for some days until the book is returned to the library or read through e-book.",
        400
      )
    );
  }

   // Check if the user has already borrowed this book
   const isBookBorrowed = user.borrowedBooks.some((borrowedBook) =>
   borrowedBook.book.equals(req.body.book)
);

if (isBookBorrowed) {
   return next(new ErrorHandler('Book already borrowed by the user', 400))
}


  const issueBook = await IssueBooks.create({ ...req.body });
  await IssueBooks.populate(issueBook, { path: "user" });
  await IssueBooks.populate(issueBook, { path: "book" });
  await IssueBooks.populate(issueBook, { path: "issuedBy", select: "name" });

  // Update user's reservedBooks
user.borrowedBooks.push({
  book: req.body.book,
  borrowDate: new Date(),
});

user.chat.push({
  message: `You have borrowed ${book.title} book. You take this book by ${new Date(Date.now()).toDateString(0, 10)}.Take care of the Book Thanks. If you have any queries, please contact us at email@example.com.`
});

await user.save();

  await Book.findByIdAndUpdate(
    req.body.book,
    { $set: { quantity: book.quantity - 1 } },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  

  res.status(201).json(issueBook);
});



exports.userIssue = catchAsyncError(async (req, res, next) => {
  const issues = await IssueBooks.find({ user: req.user._id })
    .populate("user", "name")
    .populate("book", "title")
    .populate("issuedBy")

  if (!issues) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({ success: true, issues });
});


// get single issue book by user ID details
exports.getIssueBook = catchAsyncError(async (req, res, next) => {
  const issuedBooksToUser = await IssueBooks.findById({user:req.user.id})
    .populate({ path: "user", select: "name" })
    .populate({ path: "book", select: "title" })

  if (!issuedBooksToUser) {
    return next(new ErrorHandler("Issue Book not found", 404))
  }
  // if(issueBook&&(issueBook.user._id === req.user._id))
  res.status(200).json(issuedBooksToUser)

})



exports.returnBook = catchAsyncError(async (req, res) => {
  const issueBook = await IssueBooks.findById(req.params.issueBookId);
  const book = await Book.findById(req.body.book);

  if (!issueBook) {
    return next(new ErrorHandler('Issue book not found', 404));
  }

  if (!book) {
    return next(new ErrorHandler('Book not found', 404));
  }

  issueBook.returned = true;

  await issueBook.save();

  await Book.findByIdAndUpdate(book._id, { $inc: { quantity: 1 } });
 // Get the user who borrowed the book
 const user = await User.findById(issueBook.user);

 if (!user) {
   return next(new ErrorHandler('User not found', 404));
 }

 // Remove the returned book from the 'borrowedBooks' array in the User model
 user.borrowedBooks = user.borrowedBooks.filter(
   (borrowedBook) => !borrowedBook.book.equals(req.body.book)
 );

 user.chat.push({
  message: `You have return the borrowed book. You return this book by ${new Date(Date.now()).toDateString(0, 10)}. If you have any queries, please contact us at email@example.com.`
});
 // Save the updated user data
 await user.save();


  res.status(200).json({
    success: true,
  });
});

exports.deleteIssueBook = catchAsyncError(async (req, res, next) => {
  const issueBook = await IssueBooks.findById(req.params.id);

  if (!issueBook) {
    return next(new ErrorHandler('Issue book not found', 404));
  }
  await issueBook.deleteOne()

  res.status(200).json({
    success: true,
    message: 'Issue Book deleted succesfully'

  });
});