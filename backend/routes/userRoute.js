const express = require("express")
const { registerUser, loginUser, logoutUser, getUser, getLoginStatus, updateUser, updatePhoto } = require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.get("/getUser", protect, getUser)
router.get("/getLoginStatus", getLoginStatus)
router.patch("/updateUser", protect, updateUser)
router.patch("/updatePhoto", protect, updatePhoto)




module.exports = router