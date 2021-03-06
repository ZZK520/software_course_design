const db = require("../models");
const FineSchedule = db.fineSchedules;

const { searchUserByID } = require("../tools/search.js");

// Create and Save a new FineSchedule
exports.create = async (req, res) => {
  function validateLoad(item) {
    if (!item.EmployeeID) return false;
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
    const ID = req.body.EmployeeID;
    const user = await searchUserByID(ID);
    console.log('user', user);
    const fineScheduleData = new FineSchedule({
      Amount: req.body.Amount,
      Description: req.body.Description,
      Time: req.body.Time,
      Employee: user.id
    });

    console.log('fineScheduleData', fineScheduleData);
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
        return res.json(responseData)
      });
  }

};

// Retrieve all fineSchedules from the database.
exports.findAll = async (req, res) => {
  const responseData = {
    status: 200,
    data: {},
    error: "",
    message: "",
  };
  console.log('req.query', req.query);
  const time = req.query.Time;
  const ID = req.query.EmployeeID;
  const user = await searchUserByID(ID);
  let exact_mode = 0;
  if (req.query.tag == "exact") {
    exact_mode = 1;
  }
  console.log('user', user);
  try {
    let data = await filterByTime(FineSchedule, time, exact_mode);
    data = data.filter(item => item.Employee.ID == ID);
    console.log('data', data);
    responseData.data = data
  } catch (error) {
    responseData.error = error
  } finally {
    return res.json(responseData);

  }
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
  const responseData = {
    status: 200,
    data: {},
    error: "",
    message: "",
  };

  if (!req.body) {
    responseData.status = 400;
    responseData.message = "Data to update can not be empty!";
    return res.json(responseData);
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  FineSchedule.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        responseData.status = 404;
        responseData.message = `Cannot update fineSchedule with id=${id}. Maybe fineSchedule was not found!`;
        return res.json(responseData);
        res.status(404).send({
          message: `Cannot update fineSchedule with id=${id}. Maybe fineSchedule was not found!`
        });
      } else {
        responseData.message = "fineSchedule was updated successfully."
        return res.json(responseData);
        res.send({ message: "fineSchedule was updated successfully." });
      }
    })
    .catch(err => {
      responseData.message = "Error updating fineSchedule with id=" + id;
      res.status = 500;
      res.error = err;
      return res.json(responseData);
      res.status(500).send({
        message: "Error updating fineSchedule with id=" + id
      });
    });
};

// Delete a fineSchedule with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  FineSchedule.findByIdAndRemove(id, { useFindAndModify: false })
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
function filterByTime(Model, time, exact_mode) {
  //-1降序，1升序
  console.log('filterByTime time', time);

  let cond = { Time: { $lte: time } };
  if (!time) {
    cond = {};
  }
  if (exact_mode == 1) {//精准匹配
    // 具体时间-某个月
    cond = {};//所有时间
  }
  return new Promise(function (resolve, reject) {
    Model.find(cond).
      populate('Employee', { "Name": 1, "ID": 1 }).
      exec(function (err, data) {
        if (err) {
          console.log('err', err);
          reject(err);
        }
        let final=data;
        if (exact_mode == 1) {
        // console.log('final 1',final);

          final=data.filter(item => {
            console.log('item.Time',item.Time);
            console.log('time',time);
            return item.Time ==time;
          })
        // console.log('final 2',final);
        }
        resolve(final);
      })
  })
}