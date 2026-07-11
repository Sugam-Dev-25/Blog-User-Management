require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

const pageRoutes = require("./app/routes/page");
const authRoutes = require("./app/routes/auth");
const dashboardRoutes = require("./app/routes/dashboard");
const blogRoutes = require("./app/routes/blog");
const userRoutes = require("./app/routes/user");
const profileRoutes = require("./app/routes/profile");

const connectDB = require("./app/config/db");

const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use(methodOverride("_method"));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

app.use(flash());

app.use((req, res, next) => {

    res.locals.success = req.flash("success");

    res.locals.error = req.flash("error");
    res.locals.user = req.session.user || null;

    next();

});

app.use("/", pageRoutes);
app.use("/api/auth", authRoutes);
app.use("/", dashboardRoutes);
app.use("/", blogRoutes);
app.use("/", userRoutes);
app.use("/", profileRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "app/views"));

app.use(expressLayouts);

app.set("layout", "layouts/main");

app.get("/", (req, res) => {

    res.send("Blog Management Project Running");

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server Running : ${PORT}`);

});