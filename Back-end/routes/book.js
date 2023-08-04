const express = require("express")
const { getAllBooks, createBook, updateBook, deleteBook, getSingleBook, requestBookByUser, reserveBook, cancelReservation, getAdminBooks, getBooksForIssuing, getAllrequestedBooks, deleteRequestedBook, getAllReservedBook, deleteReservedBook } = require("../controllers/book.controller.js")
const { isAuthenticatedUser, authorizeRoles, } = require("../middleware/auth.js")
const router = express.Router()

router.route('/books').get(getAllBooks)

router.route('/admin/books').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminBooks)

router.route('/admin/book/new')
    .post(isAuthenticatedUser, authorizeRoles("admin"), createBook)

router.route('/admin/book/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateBook)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBook)

router.route('/book/:id').get(getSingleBook)

router.route('/book-request').post(isAuthenticatedUser, requestBookByUser)

router.route("/admin/requested-books")
.get(isAuthenticatedUser, authorizeRoles("admin"), getAllrequestedBooks)

router.route('/admin/requested-book/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteRequestedBook)

router.route('/book-reserve').post(isAuthenticatedUser, reserveBook)
router.route('/admin/reserved-books').get(isAuthenticatedUser, getAllReservedBook)
router.route('/book-reserve/:reservationId').put(isAuthenticatedUser, cancelReservation)
router.route('/admin/reserved-book/:id').delete(isAuthenticatedUser, deleteReservedBook)


router.route('/admin/search-books/:id').get(isAuthenticatedUser, authorizeRoles("admin"), getBooksForIssuing)




module.exports = router