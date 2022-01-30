require('dotenv').config({});
const express = require ('express');
const sequelize = require("./sequelize");
const Student = require("./models/Student");
const University = require("./models/University");
const cors = require('cors');
const app = express();
const path = require('path');
var students = require('./routes/student');
var universities = require('./routes/university');
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.listen(process.env.PORT || 8080, async()=>{
  console.log("Running");
  try {
      await sequelize.authenticate();
      console.log("Connected")
  } catch (err) {
      console.log("Was not able to connect: ", err)
  }
})
University.hasMany(Student);
app.use('/students',students);
app.use('/universities',universities);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.use((err, req, res, next) => {
  console.error("[ERROR]:" + err);
  res.status(500).json({ message: "500 - Server Error" });
});