const ErrorHandler = require("../utils/ErrorCLass")

async function isAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return next(new ErrorHandler(402, "Unauthorised Request! Please login"))
    }
    next()
}

module.exports = isAuth