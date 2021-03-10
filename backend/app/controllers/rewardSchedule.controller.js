const db = require("../models");
const RewardSchedule = db.rewardSchedules;
const dayjs = require('dayjs');

// Create and Save a new RewardSchedule
exports.create = (req, res) => {

  console.log('got it', req.body);
  const responseData = {
    status: 200,
    data: {},
    error: "",
    message: "",
  };
  // console.log(RewardSchedule);
  // responseData.data = RewardSchedule;
  // return res.json(responseData);


  // Validate request
  let validateRes = validateLoad(req.body);
  if (validateRes == false) {
    responseData.status = 400;
    responseData.message = "Content can not be empty!";
    return res.json(responseData);
  } else {


    // Create a RewardSchedule
    const RewardScheduleData = new RewardSchedule({
      Amount: req.body.Amount,
      Description: req.body.Description,
      Time: req.body.Time,

    });

    console.log('RewardScheduleData', RewardScheduleData);
    // Save RewardSchedule in the database
    RewardScheduleData
      .save(RewardScheduleData)
      .then(data => {
        responseData.status = 200;
        responseData.message = "创建成功";
        responseData.data = data;
        return res.json(responseData);
      })
      .catch(err => {
        responseData.status = 500;
        responseData.message = "创建失败";
        responseData.error = err.message || "Some error occurred while creating the RewardSchedule.";
        // res.status(500).send({
        //   message:
        //     err.message || "Some error occurred while creating the RewardSchedule."
        // });
        return res.json(responseData)
      });
  }

};

// Retrieve all RewardSchedules from the database.
exports.findAll = async (req, res) => {
  const responseData = {
    status: 200,
    data: {},
    error: "",
    message: "",
  };
  // console.log('req.query', req.query);
  const time = req.query.Time;
  try {
    let data = await filterByTime(RewardSchedule, time);
    console.log('data', data);
    responseData.data = data
  } catch (error) {
    responseData.error = error
  } finally {
    return res.json(responseData);

  }

  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  RewardSchedule.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving RewardSchedules."
      });
    });
};

// Find a single RewardSchedule with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  RewardSchedule.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found RewardSchedule with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving RewardSchedule with id=" + id });
    });
};

// Update a RewardSchedule by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  RewardSchedule.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update RewardSchedule with id=${id}. Maybe RewardSchedule was not found!`
        });
      } else res.send({ message: "RewardSchedule was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating RewardSchedule with id=" + id
      });
    });
};

// Delete a RewardSchedule with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  RewardSchedule.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete RewardSchedule with id=${id}. Maybe RewardSchedule was not found!`
        });
      } else {
        res.send({
          message: "RewardSchedule was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete RewardSchedule with id=" + id
      });
    });
};

// Delete all RewardSchedules from the database.
exports.deleteAll = (req, res) => {
  RewardSchedule.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} RewardSchedules were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all RewardSchedules."
      });
    });
};

// Find all published RewardSchedules
exports.findAllPublished = (req, res) => {
  RewardSchedule.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving RewardSchedules."
      });
    });
};

function validateLoad(item) {
  if (!item.Amount) return false;
  if (!item.Time) return false;
  if (!item.Description) return false;
  return true;
}
function filterByTime(Model, time) {
  //-1降序，1升序
  console.log('filterByTime time', time);
  let cond = { Time: { $lte: time } };
  return new Promise(function (resolve, reject) {
    Model.find(cond).
      populate('Employee').
      exec(function (err, data) {
        if (err) {
          reject(err);
        }
        resolve(data);
      })
  })
}