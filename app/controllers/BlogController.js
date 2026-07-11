const Blog = require("../models/Blog");
const DeleteImage = require("../../utils/deleteImage");

class BlogController {
  async index(req, res) {
    const blogs = await Blog.find({
      isDeleted: false,
    })
      .populate("author")
      .sort({ createdAt: -1 });

    res.render("blogs/index", {
      title: "All Blogs",
      blogs,
      user: req.session.user || null,
    });
  }

  create(req, res) {
    res.render("blogs/create", {
      title: "Create Blog",
    });
  }

  async store(req, res) {
    try {
      const { title, description } = req.body;

      await Blog.create({
        title,

        description,

        image: req.file ? req.file.filename : "",

        author: req.session.user.id,
      });

      req.flash("success", "Blog Created Successfully");

      res.redirect("/blogs");
    } catch (err) {
      console.log(err);

      req.flash("error", err.message);

      res.redirect("/blogs/create");
    }
  }

  async edit(req, res) {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        req.flash("error", "Blog not found.");
        return res.redirect("/blogs");
      }

      // Owner Check
      if (
        blog.author.toString() !== req.session.user.id &&
        req.session.user.role !== "admin"
      ) {
        req.flash("error", "Unauthorized access.");
        return res.redirect("/blogs");
      }

      res.render("blogs/edit", {
        title: "Edit Blog",
        blog,
      });
    } catch (err) {
      console.log(err);

      req.flash("error", err.message);

      res.redirect("/blogs");
    }
  }

  async update(req, res) {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        req.flash("error", "Blog not found.");
        return res.redirect("/blogs");
      }

      if (
        blog.author.toString() !== req.session.user.id &&
        req.session.user.role !== "admin"
      ) {
        req.flash("error", "Unauthorized.");
        return res.redirect("/blogs");
      }

      blog.title = req.body.title;
      blog.description = req.body.description;

      if (req.file) {
        DeleteImage.remove("blogs", blog.image);
        blog.image = req.file.filename;
      }

      await blog.save();

      req.flash("success", "Blog Updated Successfully");

      res.redirect("/blogs");
    } catch (err) {
      console.log(err);

      req.flash("error", err.message);

      res.redirect("/blogs");
    }
  }

  async show(req, res) {
    try {
      const blog = await Blog.findOne({
        _id: req.params.id,
        isDeleted: false,
      }).populate("author");

      if (!blog) {
        req.flash("error", "Blog not found.");

        return res.redirect("/blogs");
      }

      res.render("blogs/show", {
        title: blog.title,

        blog,

        user: req.session.user || null,
      });
    } catch (error) {
      console.log(error);

      req.flash("error", error.message);

      res.redirect("/blogs");
    }
  }

  async destroy(req, res) {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        req.flash("error", "Blog not found.");
        return res.redirect("/blogs");
      }

      if (
        blog.author.toString() !== req.session.user.id &&
        req.session.user.role !== "admin"
      ) {
        req.flash("error", "Unauthorized Access.");
        return res.redirect("/blogs");
      }

      if (req.session.user.role === "admin") {
        if (blog.image) {
          DeleteImage.remove("blogs", blog.image);
        }

        await Blog.findByIdAndDelete(blog._id);

        req.flash("success", "Blog Permanently Deleted.");
      } else {
        blog.isDeleted = true;

        await blog.save();

        req.flash("success", "Blog Deleted Successfully.");
      }

      return res.redirect("/blogs");
    } catch (error) {
      console.log(error);

      req.flash("error", error.message);

      return res.redirect("/blogs");
    }
  }
}

module.exports = new BlogController();
