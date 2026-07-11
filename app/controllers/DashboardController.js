class DashboardController {

    index(req, res) {

        res.render("dashboard/dashboard", {

            title: "Dashboard",

            user: req.session.user

        });

    }

}

module.exports = new DashboardController();