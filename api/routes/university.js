var express = require('express')
const University = require("../models/University");
const Student = require("../models/Student");
var router = express.Router();

router.get("/", async(req, res) => {
  try {
      const universities = await University.findAll();
      return res.status(200).json(universities);
  } catch (err) {
      return res.status(501).json(err);
  }
});

//Get all students from a university
router.get("/:universityId/students", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId, {
      include: [Student]
    });
    if (university) {
      res.status(200).json(university.students);
    } else {
      res.status(404).json({ message: '404 - University Not Found!'});
    }
  } catch(error) {
    next(error);
  }
});

//Create a university
router.post("/", async (req, res, next) => {
  try {
    await University.create(req.body);
    res.status(201).json({ message: "University Created!" });
  } catch (err) {
    next(err);
  }
});

//Post a new student into an university
router.post("/:universityId/students", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const student = new Student(req.body);
      student.universityId = university.id;
      await student.save();
      res.status(201).json({ message: 'Student crated!'});
    } else {
      res.status(404).json({ message: '404 - University Not Found'});
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;