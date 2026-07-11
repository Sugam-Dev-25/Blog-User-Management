const User = require("../models/User");

class UserController {

    async index(req, res) {

        try {

            const users = await User.find().sort({ createdAt: -1 });

            res.render("users/index", {
                title: "Users",
                users,
                user: req.session.user
            });

        } catch (error) {

            console.log(error);

            req.flash("error", error.message);

            res.redirect("/dashboard");

        }

    }

    async destroy(req, res) {

        try {

            const id = req.params.id;

            if (id === req.session.user.id) {

                req.flash("error", "You can't delete your own account.");

                return res.redirect("/users");

            }

            const user = await User.findById(id);

            if (!user) {

                req.flash("error", "User not found.");

                return res.redirect("/users");

            }

            await User.findByIdAndDelete(id);

            req.flash("success", "User Deleted Successfully.");

            res.redirect("/users");

        } catch (error) {

            console.log(error);

            req.flash("error", error.message);

            res.redirect("/users");

        }

    }

}

module.exports = new UserController();