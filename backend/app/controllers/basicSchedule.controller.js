const db = require("../models");
const BasicSchedule = db.basicSchedules;


// Create and Save a new BasicSchedule
exports.create = (req, res) => {
 function validateLoad(item) {
    if (!item.Amount) return false;
    if (!item.Time) return false;
    return true;
  }
  console.log('got it', req.body);
  const responseData = {
    status: 200,
    data: {},
    error: "",
    message: "",
  };
  // console.log(BasicSchedule);
  // responseData.data = BasicSchedule;
  // return res.json(responseData);

 
  // Validate request
  let validateRes = validateLoad(req.body);
  if (validateRes == false) {
    responseData.status = 400;
    responseData.message = "Content can not be empty!";
    return res.json(responseData);
  } else {


    // Create a BasicSchedule
    const BasicScheduleData = new BasicSchedule({
      Amount: req.body.Amount,
      Description: req.body.Description,
      Time: req.body.Time,
    
    });

    console.log('BasicScheduleData',BasicScheduleData);
    // Save BasicScheduleData in the database
    BasicScheduleData
      .save(BasicScheduleData)
      .then(data => {
        responseData.status = 200;
        responseData.message = "创建成功";
        responseData.data = data;
        return res.json(responseData);
      })
      .catch(err => {
        responseData.status = 500;
        responseData.message = "创建失败";
        responseData.error = err.message || "Some error occurred while creating the BasicSchedule.";
        // res.status(500).send({
        //   message:
        //     err.message || "Some error occurred while creating the BasicSchedule."
        // });
        return res.json(responseData)
      });
  }

};

// Retrieve all BasicSchedules from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  BasicSchedule.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving BasicSchedules."
      });
    });
};

// Find a single BasicSchedule with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  BasicSchedule.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found BasicSchedule with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving BasicSchedule with id=" + id });
    });
};

// Update a BasicSchedule by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  BasicSchedule.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update BasicSchedule with id=${id}. Maybe BasicSchedule was not found!`
        });
      } else res.send({ message: "BasicSchedule was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating BasicSchedule with id=" + id
      });
    });
};

// Delete a BasicSchedule with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  BasicSchedule.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete BasicSchedule with id=${id}. Maybe BasicSchedule was not found!`
        });
      } else {
        res.send({
          message: "BasicSchedule was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete BasicSchedule with id=" + id
      });
    });
};

// Delete all BasicSchedules from the database.
exports.deleteAll = (req, res) => {
  BasicSchedule.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} BasicSchedules were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all BasicSchedules."
      });
    });
};

// Find all published BasicSchedules
exports.findAllPublished = (req, res) => {
  BasicSchedule.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving BasicSchedules."
      });
    });
};
