const express = require('express');
const passport = require('passport');
const Authrouter = express.Router();


// google login
Authrouter.route('/').get(passport.authenticate('google')
);

// redirect after authenticate
Authrouter.route('/callback').get(passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/auth/google/profile')
})

// get login user info
Authrouter.route('/profile').get((req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/google');
    }
    res.json({ res: req.user })
    // res.send(`<img src=${req.user.profile_picture} alt="profile" style="width: 50px;height: 50px;"> <h1>Hello, ${req.user.name.split(" ")[0]}!</h1> <br/> <a href="/logout">Logout now</a>`);
})


// Authrouter.route("/getid").get((req, res) => {
//     res.send(res)
// })

module.exports = Authrouter