const db = require("../models");
const Article = db.articles;

// Create and Save a new article
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    // res.render("create/index.ejs"); // ------------ EXTRA ----------- //
    return
  }

  // Create a article
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    tag: req.body.tag, // ------------ EXTRA ----------- //
    available: req.body.available ? req.body.available : false
  });

  // Save article in the database
  article
    .save(article)
    .then(data => {
      res.send(data);
      res.redirect("/api/articles");  // ------------ EXTRA ----------- //
      })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the article."
      });
    });
};


// Find all available Articles
exports.findAllAvailable = async (req, res) => {
  Article.find({ available: true })
    .then(data => {
      res.send(data);
      // res.render("blog/available", { data: data });  // ------------ EXTRA ----------- //

    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
};


// ----------------------------REQUIRED-------------------------------- //

// Find all articles
exports.findAll = async (req, res) => {
  // const title = req.query.title;
  Article.find()
    .then(data => {
      res.send(data);
      // res.render("blog/blog", { data: data });
    })
    .catch(err => {
      return es.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Articles."
      });
    });
};

// ----------------------------EXTRAS-------------------------------- //

// Find a single Article with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  Article.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Article with id " + id });
      else res.send(data);
    })
    .catch(err => {
      return res
        .status(500)
        .send({ message: "Error retrieving Article with id=" + id });
    });
};

// Update an Article identified by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Article with id=${id}. Maybe Article was not found!`
        });
      } else res.send({ message: "Article was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Article with id=" + id
      });
    });
};



// Delete a Article with the specified id:
exports.delete = async (req, res) => {
  const id = req.params.id;
  Article.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot delete Article with id=${id}. Maybe Article was not found!`
        });
      } else {
        res.send({
          message: "Article was deleted successfully!"
        });
      }
    })
    .catch(err => {
      return res.status(500).send({
        message: "Could not delete Article with id=" + id
      });
    });
};

// Delete all Articles from the database
exports.deleteAll = async (req, res) => {
  Article.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Articles were deleted successfully!`
      });
      res.redirect("/");
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Articles."
      });
    });
};