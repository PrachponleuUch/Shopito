// Middleware for asynchronous error handling in express routes
const asyncHandler = require("express-async-handler")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: "1d" // User will be automatically logged out after one day
  })
}

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Validation
  if(!name || !email || !password){
    res.status(400)
    throw new Error("Please fill in all required fields.")
  }

  if (password.length < 6){
    res.status(400)
    throw new Error("Password must be up to 6 characters")
  }

  // Check if user exists
  const userExists = await User.findOne({email})

  if (userExists){
    res.status(400)
    throw new Error("User already exists")
  }

  // Create new User
  const user = await User.create({
    name,
    email,
    password
  })

  // Generate Token
  const token = generateToken(user._id)

  if (user){
    const { _id, name, email, role } = user
    // Log User in using cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      // secure: true,
      // sameSite: null
    })

    // Send user data
    res.status(201).json({
      _id,
      name,
      email,
      token,
      role
    })
  } else {
    res.status(400)
    throw new Error("User wasn't successfully created")
  }
  
  res.send("Register User...")
})

// Login User
const loginUser = asyncHandler ( async (req, res) => {
  const { email, password } = req.body

  // Validate Request
  if(!email || !password){
    res.status(400)
    throw new Error("Please fill in all required fields.")
  }

  // Check if user exists
  const user = await User.findOne({email})
  if (!user){
    res.status(400)
    throw new Error("User does not exist.")
  }

  // Check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password)

  // Generate Token
  const token = generateToken(user._id)

  if (user && passwordIsCorrect){
    const newUser = await User.findOne({email}).select("-password")
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      // secure: true,
      // sameSite: null
    })
    // Send user data
    res.status(201).json(newUser)
  } else {
    res.status(400)
    throw new Error("Incorrect Password")
  }
  res.send("Login User...")
})

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    // secure: true,
    // sameSite: null
  })
  return res.status(200).json({message: "User logged out successfully."})
})

// Get User
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password")
  if (user){
    res.status(200).json(user)
  } else {
    res.status(400)
    throw new Error("User not found.")
  }
})

// Get Login Status
const getLoginStatus = asyncHandler (async (req, res) => {
  const token = req.cookies.token
  if (!token){
    return res.json(false)
  }
  
  // Verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET)
  if (verified){
    return res.json(true)
  }
  return res.json(false)
})

// Update User Route
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    const { name, phone, address } = user
    user.name = req.body.name || name
    user.phone = req.body.phone || phone
    user.address = req.body.address || address

    const updatedUser = await user.save()
    res.status(200).json(updatedUser)
  } else {
    res.status(401)
    throw new Error("User not found")
  }
  res.send("Update User...")
})

// Update Photo
const updatePhoto = asyncHandler(async (req, res) => {
  const { photo } = req.body
  const user = await User.findById(req.user._id)
  user.photo = photo
  const updatedUser = await user.save()
  res.status(200).json(updatedUser)
  res.send("Update Photo...")
})

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getLoginStatus,
  updateUser,
  updatePhoto
}