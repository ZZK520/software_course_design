const express = require("express");
const cors = require("cors");

const app = express();

// var corsOptions = {
//   origin: "http://localhost:7081"
// };

// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const {LOCAL_CONFI,ONLINE_CONFI}=require("./app/config/db.config.js")
db.mongoose.connect(ONLINE_CONFI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/turorial.routes")(app);
require("./app/routes/rewardSchedule.routes")(app);
require("./app/routes/fineSchedule.routes")(app);
require("./app/routes/auth.routes")(app);




// set port, listen for requests
const PORT = process.env.PORT || 7080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
