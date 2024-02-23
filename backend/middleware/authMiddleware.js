const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

// Protect access of information from anonymous user
const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token){
      res.status(401)
      throw new Error("Not authorized, please login.")
    }
    
    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET)

    // Get User Id from Token
    const user = await User.findById(verified.id).select("-password")
    if (!user) {
      res.status(401)
      throw new Error("User not found.")
    }

    // Send user information to the request
    req.user = user
    // Call the next function
    next()
  } catch (error) {
    res.status(401)
    throw new Error("Not authorized, please login.")
  }
})

module.exports = {
  protect
}