const db = require("../models");
const Article = db.articles;

// Create and Save a new article
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a article
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    available: req.body.available ? req.body.available : false
  });

  // Save article in the database
  article
    .save(article)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the article."
      });
    });
};


// Find all available Articles
exports.findAllAvailable = (req, res) => {
  Article.find({ available: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
};
