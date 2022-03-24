module.exports = app => {
  const articles = require("../controllers/article.controller.js");
  var router = require("express").Router();


  // Create a new articles
  router.post("/create", articles.create);

  router.get("/create", articles.create);

  // Retrieve all articles
  router.get("/articles", articles.findAll);

  // Retrieve all available articles
  router.get("/articles/available", articles.findAllAvailable);

  // Retrieve a single Article with id
  router.get("/article/:id", articles.findOne);

  // Update a Article with id
  router.put("/article/:id", articles.update);

  // Delete a Article with id
  router.delete("/article/:id", articles.delete);

  // Deleat all Article
  router.delete("/articles", articles.deleteAll);
  
  app.use("/api", router);
};