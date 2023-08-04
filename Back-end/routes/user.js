const express = require('express')
const router = express.Router()
const { registerUser,
    loginUser,
    logoutUser,
    forgetPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser, 
    getAllFeedback,
    sendFeedback,
    getUsersForIssuing,
    getUserChats,
    deleteFeedback,
    deleteChat} = require("../controllers/user.controller")
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/password/forgot").post(forgetPassword)

router.route("/password/reset/:token").put(resetPassword)

router.route("/logout").get(logoutUser)

router.route("/profile").get(isAuthenticatedUser, getUserDetails)

router.route("/password/update").put(isAuthenticatedUser, updatePassword)

router.route("/profile/update").put(isAuthenticatedUser, updateProfile)

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)

router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)


router.route("/feed-back").post(isAuthenticatedUser,sendFeedback)
router.route("/admin/feed-backs").get(isAuthenticatedUser, authorizeRoles("admin"),getAllFeedback)
router.route("/admin/feed-back/:id").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteFeedback)

router.route("/admin/search-users/:id").get(isAuthenticatedUser, authorizeRoles("admin"),getUsersForIssuing)


router.route("/notifications").get(isAuthenticatedUser, getUserChats)
router.route("/notification/:chatId").delete(isAuthenticatedUser, deleteChat)





module.exports = router