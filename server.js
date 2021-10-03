const express = require("express");
const _ = require("lodash");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogsRoutes = require("./routes/blogsRoutes");

const mongoURI =
  "mongodb+srv://nevgauker:Rotem2905999@cluster0.cujwd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();

app.set("view engine", "ejs");

app.listen(process.env.YOUR_PORT || 3000);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// app.get('/blogs/create', (req, res) => {
//     res.render('create', { title: 'Create a new blog' });
//   });

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blogs
app.use("/blogs", blogsRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
