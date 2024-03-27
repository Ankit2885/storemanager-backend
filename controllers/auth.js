const path = require('path');
const User = require('../models/userModel')

exports.signUpUser = (req, res, next) => {
    res.sendFile(path.join(__dirname, "../views/signup.html"));
}

exports.loginUser = (req, res, next) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
}

exports.logoutUser = (req, res, next) => {
    res.redirect('/login')
}

exports.userAuthentication = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    if (email && password) {
        User.findOne({ email: email }).then((user) => {
            if (user.password === password) {
                res.redirect('/')
            }
        }).catch(() => {
            res.redirect('/login')
        })
    } else {
        res.redirect('/login')
    }
}

exports.createUser = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    if (email && password && name) {
        User.findOne({ email: email }).then((userExist) => {
            if (userExist) {
                res.redirect('/signup')
                // res.status(200).json({
                //     status: false,
                //     message: "this user already exists",
                // })
            } else {
                const user = new User({ name, email, password })
                user.save().then(() => {
                    res.redirect('/login')
                    // res.status(201).json({
                    //     status: true,
                    //     message: "user created successfully",
                    // })
                }).catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: err,
                    })
                })
            }

        }).catch((err) => {
            console.log(err)
        })
    } else {
        res.redirect('/signup')
    }
}