const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const userRoute = require("./routes/userRoute")
const errorHandler = require("./middleware/errorMiddleware")


const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(
  cors({
  origin: ["http://localhost:3000", "https://shopito-alex.vercel.app"],
  credential: true
}))


// Routes
app.get("/", (req, res) => {
  res.send("Home Page...")
})

app.use("/api/v1/users", userRoute)

// Error Middleware
app.use(errorHandler)
const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })