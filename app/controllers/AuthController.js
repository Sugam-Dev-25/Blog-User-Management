const User = require("../models/User");
const JWT = require("../config/jwtToken");
const DeleteImage = require("../../utils/deleteImage");

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const existUser = await User.findOne({ email });

      if (existUser) {
        req.flash("error", "Email already exists");

        return res.redirect("/register");
      }

      const user = new User({
        name,
        email,
        password,
        profileImage: req.file ? req.file.filename : "",
      });

      await user.save();

      req.flash("success", "Registration Successful");

      res.redirect("/login");
    } catch (error) {
      console.log(error);

      req.flash("error", error.message);

      res.redirect("/register");
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        req.flash("error", "Invalid Email");

        return res.redirect("/login");
      }

      const check = await user.comparePassword(password);

      if (!check) {
        req.flash("error", "Invalid Password");

        return res.redirect("/login");
      }

      const token = JWT.generateToken({
        id: user._id,

        role: user.role,
      });

      res.cookie("token", token, {
        httpOnly: true,
      });

      req.session.user = {
        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,
      };

      req.flash("success", "Login Successful");

      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);

      req.flash("error", error.message);

      res.redirect("/login");
    }
  }

  logout(req, res) {
    res.clearCookie("token");

    req.session.destroy(() => {
      res.redirect("/login");
    });
  }

  async profile(req, res) {
    try {
      const user = await User.findById(req.session.user.id);

      res.render("auth/profile", {
        title: "My Profile",

        user,
      });
    } catch (error) {
      console.log(error);

      req.flash("error", error.message);

      res.redirect("/dashboard");
    }
  }

  async updateProfile(req, res) {

    try {

        const user = await User.findById(req.session.user.id);

        user.name = req.body.name;

        if (req.file) {

            if (user.profileImage) {

                DeleteImage.remove("profile", user.profileImage);

            }

            user.profileImage = req.file.filename;

        }

        await user.save();

        req.session.user.name = user.name;

        req.flash("success", "Profile Updated Successfully.");

        res.redirect("/dashboard");

    } catch (error) {

        console.log(error);

        req.flash("error", error.message);

        res.redirect("/profile");

    }

}
}

module.exports = new AuthController();
