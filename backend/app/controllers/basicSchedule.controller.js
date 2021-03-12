const db = require("../models");
const BasicSchedule = db.basicSchedules;
const { searchUserByID } = require("../tools/search.js");


// Create and Save a new BasicSchedule
exports.create = async (req, res) => {
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

    const ID = req.body.EmployeeID;
    try {
      const user = await searchUserByID(ID);
      // Create a BasicSchedule
      const BasicScheduleData = new BasicSchedule({
        Amount: req.body.Amount,
        Time: req.body.Time,
        Employee: user.id
      });

      console.log('BasicScheduleData', BasicScheduleData);
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
          responseData.message = "创建失败，请检查输入信息";
          responseData.error = err;
          return res.json(responseData)
        });
    } catch (error) {
      responseData.status = 500;
      responseData.message = "创建失败，请检查输入信息";
      responseData.error = error.message || "Some error occurred while creating the BasicSchedule.";
      return res.json(responseData);
    }

  }

};

// Retrieve all BasicSchedules from the database.
exports.findAll = async (req, res) => {
  const responseData = {
    status: 200,
    data: {},
    error: "",
    message: "",
  };
  console.log('req.query basicSchedule', req.query);
  const time = req.query.Time;
  const ID = req.query.EmployeeID;
  // const user = await searchUserByID(ID);
  let exact_mode = 0;
  if (req.query.tag == "exact") {
    exact_mode = 1;
  }
  // console.log('user', user);
  try {
    let data = await filterByTime(BasicSchedule, time, exact_mode);
    console.log(' req.query basicSchedule data', data);
    
    data = data.filter(item => item.Employee.ID == ID);
    // console.log('data', data);
    responseData.data = data
  } catch (error) {
    responseData.error = error
  } finally {
    return res.json(responseData);

  }
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
  }

  const id = req.params.id;

  BasicSchedule.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        responseData.status = 404;
        responseData.message = `Cannot update BasicSchedule with id=${id}. Maybe fineSchedule was not found!`;
        return res.json(responseData);
      } else {
        responseData.message = "BasicSchedule was updated successfully."
        return res.json(responseData);
      }
    })
    .catch(err => {
      responseData.message = "Error updating BasicSchedule with id=" + id;
      res.status = 500;
      res.error = err;
      return res.json(responseData);
    });
};

// Delete a BasicSchedule with the specified id in the request
exports.delete = (req, res) => {
  const responseData = {
    status: 200,
    data: {},
    error: "",
    message: "",
  };
  const id = req.params.id;

  BasicSchedule.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        responseData.status = 404;
        responseData.message = `Cannot delete BasicSchedule with id=${id}. Maybe BasicSchedule was not found!`
        return res.json(responseData);
      } else {
        responseData.message = "BasicSchedule was deleted successfully!"
        return res.json(responseData);
      }
    })
    .catch(err => {
      responseData.message = "Error updating fineSchedule with id=" + id;
      res.status = 500;
      res.error = err;
      return res.json(responseData);
    
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

function filterByTime(Model, time, exact_mode) {
  //-1降序，1升序
  console.log('filterByTime time basciSchedule', time);

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
