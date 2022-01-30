var express = require('express')
const Student = require("../models/Student");
var router = express.Router();

router.get("/", async(req, res) => {
  try {
      const students = await Student.findAll();
      return res.status(200).json(students);
  } catch (err) {
      return res.status(501).json(err);
  }
});
router.get("/:studentId", async(req, res) => {
  try {
      const student = await Student.findByPk(req.params.studentId);
      if (student) {
          return res.status(200).json(student);
      } else {
          return res.status(404).json({ error: `Student with the id ${req.params.studentId} not found!` });
      }
  } catch (err) {
      return res.status(501).json(err);
  }
});

router.post("/", async(req, res) => {
  try {
      const newStudent = await Student.create(req.body);
      return res.status(201).json(newStudent);
  } catch (err) {
      res.status(501).json(err);
  }
});

router.put("/:studentId", async(req, res) => {
  try {
      const student = await Student.findByPk(req.params.studentId);
      if(student){
        await student.update(req.body);
        return res.status(201).json(student);
      }else{
        return res.status(404);
      }
  } catch (err) {
      res.status(501).json(err);
  }
})

router.delete("/:studentId", async(req, res,next) => {

  try {
      const student = await Student.findByPk(req.params.studentId);
      if (student) {
          await student.destroy();
          res.status(200);
      } else {
          res.status(200);
      }
  } catch (err) {
      next(err);
  }
})

module.exports = router