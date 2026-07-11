class AdminMiddleware {

    isAdmin(req, res, next) {

        if (!req.session.user) {

            req.flash("error", "Please login first.");

            return res.redirect("/login");

        }

        if (req.session.user.role !== "admin") {

            req.flash("error", "Access Denied.");

            return res.redirect("/dashboard");

        }

        next();

    }

}

module.exports = new AdminMiddleware();