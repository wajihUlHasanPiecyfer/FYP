const express = require("express")
const { createIssueBook, getAllIssueBook, userIssue, getIssueBook, returnBook, deleteIssueBook } = require("../controllers/issueSchema")
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles , } = require("../middleware/auth.js")


router.route('/admin/issued-books').get(isAuthenticatedUser, authorizeRoles("admin"), getAllIssueBook )

router.route('/admin/issue-book').post(isAuthenticatedUser, authorizeRoles("admin"), createIssueBook)

router.route('/issue-user').get(isAuthenticatedUser, userIssue)

router.route('/admin/issued-book/:id').get(isAuthenticatedUser, authorizeRoles("admin"), getIssueBook)

router.route('/admin/issued-book-return/:issueBookId').put(isAuthenticatedUser, authorizeRoles("admin"), returnBook)

router.route('/admin/issued-book/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteIssueBook)





module.exports = router