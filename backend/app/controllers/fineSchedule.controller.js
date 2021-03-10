const db = require("../models");
const FineSchedule = db.fineSchedules;


// Create and Save a new FineSchedule
exports.create = (req, res) => {
 function validateLoad(item) {
    if (!item.Amount) return false;
    if (!item.Time) return false;
    if (!item.Description) return false;
    return true;
  }
  console.log('got it', req.body);
  const responseData = {
    status: 200,
    data: {},
    error: "",
    message: "",
  };
  // console.log(FineSchedule);
  // responseData.data = FineSchedule;
  // return res.json(responseData);

 
  // Validate request
  let validateRes = validateLoad(req.body);
  if (validateRes == false) {
    responseData.status = 400;
    responseData.message = "Content can not be empty!";
    return res.json(responseData);
  } else {


    // Create a fineSchedule
    const fineScheduleData = new FineSchedule({
      Amount: req.body.Amount,
      Description: req.body.Description,
      Time: req.body.Time,
    
    });

    console.log('fineScheduleData',fineScheduleData);
    // Save fineScheduleData in the database
    fineScheduleData
      .save(fineScheduleData)
      .then(data => {
        responseData.status = 200;
        responseData.message = "创建成功";
        responseData.data = data;
        return res.json(responseData);
      })
      .catch(err => {
        responseData.status = 500;
        responseData.message = "创建失败";
        responseData.error = err.message || "Some error occurred while creating the fineSchedule.";
        // res.status(500).send({
        //   message:
        //     err.message || "Some error occurred while creating the fineSchedule."
        // });
        return res.json(responseData)
      });
  }

};

// Retrieve all fineSchedules from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  fineSchedule.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving fineSchedules."
      });
    });
};

// Find a single fineSchedule with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  fineSchedule.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found fineSchedule with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving fineSchedule with id=" + id });
    });
};

// Update a fineSchedule by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  fineSchedule.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update fineSchedule with id=${id}. Maybe fineSchedule was not found!`
        });
      } else res.send({ message: "fineSchedule was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating fineSchedule with id=" + id
      });
    });
};

// Delete a fineSchedule with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  fineSchedule.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete fineSchedule with id=${id}. Maybe fineSchedule was not found!`
        });
      } else {
        res.send({
          message: "fineSchedule was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete fineSchedule with id=" + id
      });
    });
};

// Delete all fineSchedules from the database.
exports.deleteAll = (req, res) => {
  fineSchedule.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} fineSchedules were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all fineSchedules."
      });
    });
};

// Find all published fineSchedules
exports.findAllPublished = (req, res) => {
  fineSchedule.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving fineSchedules."
      });
    });
};
