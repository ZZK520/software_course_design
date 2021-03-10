// const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
// db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.rewardSchedules = require("./rewardSchedule.model.js")(mongoose);
db.fineSchedules = require("./fineSchedule.model.js")(mongoose);
db.basicSchedules = require("./basicSchedule.model.js")(mongoose);

db.employees = require("./employee.model.js")(mongoose);



module.exports = db;
