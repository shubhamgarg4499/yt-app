const express = require("express");
const session = require("express-session");
const passport = require("passport");
const ErrorMiddleware = require("./middleware/Error.middleware");
const router = require("./Routes/index.routes");
const connectDB = require("./utils/ConnectDB");
const app = express()
// var GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()
const PORT = process.env.PORT
const cors = require('cors');
const Authrouter = require("./Routes/GoogleAuth.routes");
const passportHandler = require("./utils/Passport");
const ErrorHandler = require("./utils/ErrorCLass");
var cookieParser = require('cookie-parser');
const campaignRouter = require("./Routes/Campaigns.routes");
app.use(cookieParser())
app.use(express.json())
app.use(cors({ credentials: true }))
connectDB()
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passportHandler()

app.get('/', (req, res) => {
    res.send(`<a href="https://yt-app-0dh0.onrender.com/auth/google">Login now</a>`)
})

app.get('/login', (req, res) => {
    res.send(`<a href="https://yt-app-0dh0.onrender.com/auth/google">Login now</a>`)
})

app.get('/logout', (req, res) => {
    req.logout((error) => {
        if (error) throw new ErrorHandler(error.status, error.message)
        res.clearCookie('connect.sid');
        res.redirect('/')
    })
})


// apis routes
app.use("/api/v1", router)
app.use("/auth/google", Authrouter)
app.use("/api/v1", campaignRouter)

// apis routes ends

app.use(ErrorMiddleware)
app.listen(PORT, () => {
    console.log("Listening on " + PORT);
})
