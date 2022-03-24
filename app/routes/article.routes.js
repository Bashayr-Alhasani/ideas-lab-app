module.exports = app => {
  const articles = require("../controllers/article.controller.js");

  var router = require("express").Router();

  // Create a new articles
  router.post("/", articles.create);

  // Retrieve all articles
  router.get("/", articles.findAll);

  // Retrieve all published articles
  router.get("/available", articles.findAllAvailable);

  app.use("/api/articles", router);
};
