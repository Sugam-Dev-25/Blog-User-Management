class AuthMiddleware {

    isAuthenticated(req, res, next) {

        if (!req.session.user) {

            req.flash("error", "Please login first.");

            return res.redirect("/login");

        }

        next();

    }

}

module.exports = new AuthMiddleware();