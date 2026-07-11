class GuestMiddleware {

    isGuest(req, res, next) {

        if (req.session.user) {

            return res.redirect("/dashboard");

        }

        next();

    }

}

module.exports = new GuestMiddleware();