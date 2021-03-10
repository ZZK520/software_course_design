module.exports = app => {
  const fineSchedule = require("../controllers/fineSchedule.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", fineSchedule.create);

  // Retrieve all fineSchedule
  router.get("/", fineSchedule.findAll);

  // Retrieve all published fineSchedule
  router.get("/published", fineSchedule.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", fineSchedule.findOne);

  // Update a Tutorial with id
  router.put("/:id", fineSchedule.update);

  // Delete a Tutorial with id
  router.delete("/:id", fineSchedule.delete);

  // Create a new Tutorial
  router.delete("/", fineSchedule.deleteAll);

  app.use("/api/fineSchedule", router);
};
