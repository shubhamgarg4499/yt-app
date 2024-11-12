const express = require("express");
const ErrorHandler = require("../utils/ErrorCLass");
const router = express.Router();

router.route('/hii').get((req, res, next) => {
    // throw 
    throw new ErrorHandler(400, "error now")
    // res.send("hello hii")
})
module.exports = router