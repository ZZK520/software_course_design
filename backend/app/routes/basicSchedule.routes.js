module.exports = app => {
    const basicSchedule = require("../controllers/basicSchedule.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", basicSchedule.create);
  
    // Retrieve all basicSchedule
    router.get("/", basicSchedule.findAll);
  
    // Retrieve all published basicSchedule
    router.get("/published", basicSchedule.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", basicSchedule.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", basicSchedule.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", basicSchedule.delete);
  
    // Create a new Tutorial
    router.delete("/", basicSchedule.deleteAll);
  
    app.use("/api/basicSchedule", router);
  };
  