const db = require("../models");
const Employee = db.employees;
const dayjs = require('dayjs');

// Create and Save a new Employee
exports.create = (req, res) => {

  console.log('got it', req.body);
  const responseData = {
    status: 200,
    data: {},
    error: "",
    message: "",
  };
  // console.log(Employee);
  // responseData.data = Employee;
  // return res.json(responseData);


  // Validate request
  let validateRes = validateLoad(req.body);
  if (validateRes == false) {
    responseData.status = 400;
    responseData.message = "Content can not be empty!";
    return res.json(responseData);
  } else {


    // Create a Employee
    const EmployeeData = new Employee({
      Amount: req.body.Amount,
      Description: req.body.Description,
      Time: req.body.Time,

    });

    console.log('EmployeeData', EmployeeData);
    // Save Employee in the database
    EmployeeData
      .save(EmployeeData)
      .then(data => {
        responseData.status = 200;
        responseData.message = "创建成功";
        responseData.data = data;
        return res.json(responseData);
      })
      .catch(err => {
        responseData.status = 500;
        responseData.message = "创建失败";
        responseData.error = err.message || "Some error occurred while creating the Employee.";
        // res.status(500).send({
        //   message:
        //     err.message || "Some error occurred while creating the Employee."
        // });
        return res.json(responseData)
      });
  }

};

// Retrieve all Employees from the database.
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
    let data = await filterByTime(Employee, time);
    console.log('data', data);
    responseData.data = data
  } catch (error) {
    responseData.error = error
  } finally {
    return res.json(responseData);

  }

  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Employee.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employees."
      });
    });
};

// Find a single Employee with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Employee.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Employee with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Employee with id=" + id });
    });
};

// Update a Employee by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found!`
        });
      } else res.send({ message: "Employee was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id
      });
    });
};

// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Employee.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
        });
      } else {
        res.send({
          message: "Employee was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id
      });
    });
};

// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
  Employee.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Employees were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Employees."
      });
    });
};

// Find all published Employees
exports.findAllPublished = (req, res) => {
  Employee.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employees."
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
  if(!time){
    cond = { };
  }
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