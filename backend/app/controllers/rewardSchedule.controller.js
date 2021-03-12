const db = require("../models");
const RewardSchedule = db.rewardSchedules;
const dayjs = require('dayjs');
const { searchUserByID } = require("../tools/search.js");

// Create and Save a new RewardSchedule
exports.create = async (req, res) => {

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

    // Create a fineSchedule
    const ID = req.body.EmployeeID;
    const user = await searchUserByID(ID);
    console.log('user', user);
    const RewardScheduleData = new RewardSchedule({
      Amount: req.body.Amount,
      Description: req.body.Description,
      Time: req.body.Time,
      Employee: user.id
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
  console.log('req.query', req.query);
  const time = req.query.Time;
  const ID = req.query.EmployeeID;
  let exact_mode = 0;
  if (req.query.tag == "exact") {
    exact_mode = 1;
  }
  const user = await searchUserByID(ID);
  console.log('user', user);
  try {
    let data = await filterByTime(RewardSchedule, time, exact_mode);
    data = data.filter(item => item.Employee.ID == ID);
    console.log('data', data);
    responseData.data = data
  } catch (error) {
    responseData.error = error
  } finally {
    return res.json(responseData);

  }

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
  const responseData = {
    status: 200,
    data: {},
    error: "",
    message: "",
  };
  if (!req.body) {
    responseData.status = 400;
    responseData.message = "Data to update can not be empty!"
    return res.json(responseData);
  }

  const id = req.params.id;

  RewardSchedule.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        responseData.status = 404;
        responseData.message = `Cannot update RewardSchedule with id=${id}. Maybe RewardSchedule was not found!`;
        return res.json(responseData);
      } else {
        responseData.message = "RewardSchedule was updated successfully.";
        return res.json(responseData);
      }
    })
    .catch(err => {
      responseData.error = err;
      responseData.status = 500;
      responseData.message = "Error updating RewardSchedule with id=" + id;
      return res.json(responseData);
    });
};

// Delete a RewardSchedule with the specified id in the request
exports.delete = (req, res) => {
  const responseData = {
    status: 200,
    data: {},
    error: "",
    message: "",
  };
  const id = req.params.id;

  RewardSchedule.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        responseData.status = 404;
        responseData.message = `Cannot delete RewardSchedule with id=${id}. Maybe RewardSchedule was not found!`
        return res.json(responseData)
        res.status(404).send({
          message: `Cannot delete RewardSchedule with id=${id}. Maybe RewardSchedule was not found!`
        });
      } else {
        responseData.message = "RewardSchedule was deleted successfully!"
        return res.json(responseData);
        res.send({
          message: "RewardSchedule was deleted successfully!"
        });
      }
    })
    .catch(err => {
      responseData.err = err;
      responseData.status = 500;
      responseData.message = "Could not delete RewardSchedule with id=" + id
      return res.json(responseData)
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
exports.findSameTime = (req, res) => {
  const responseData = {
    status: 200,
    data: {},
    error: "",
    message: "",
  };
  console.log('req.query', req.query);
  responseData.data = req.query;
  return res.json(responseData);

};

function validateLoad(item) {
  if (!item.Amount) return false;
  if (!item.Time) return false;
  if (!item.Description) return false;
  return true;
}
function filterByTime(Model, time, exact_mode) {
  //-1降序，1升序
  console.log('filterByTime time', time);

  let cond = { Time: { $lte: time } };//小于所设置时间范围内所有
  if (!time) {
    cond = {};//所有时间
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
        console.log('data', data);
        if(exact_mode==1){
          data.filter(item => {
            item.Time == time;
          })
        }
   
        resolve(data);
      })
  })
}