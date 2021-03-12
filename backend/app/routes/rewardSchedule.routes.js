module.exports = app => {
  const rewardSchedule = require("../controllers/rewardSchedule.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", rewardSchedule.create);

  // Retrieve all rewardSchedule
  router.get("/", rewardSchedule.findAll);


  // Retrieve a single Tutorial with id
  router.get("/:id", rewardSchedule.findOne);

  // Update a Tutorial with id
  router.put("/:id", rewardSchedule.update);

  // Delete a Tutorial with id
  router.delete("/:id", rewardSchedule.delete);

  // Create a new Tutorial
  router.delete("/", rewardSchedule.deleteAll);

  app.use("/api/rewardSchedule", router);
};
