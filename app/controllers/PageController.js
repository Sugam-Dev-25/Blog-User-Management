class PageController {

    home(req, res) {

        res.redirect("/login");

    }

    login(req, res) {

        res.render("auth/login", {
            title: "Login"
        });

    }

    register(req, res) {

        res.render("auth/register", {
            title: "Register"
        });

    }

}

module.exports = new PageController();