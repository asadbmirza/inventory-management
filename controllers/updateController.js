const db = require("../db/queries");

async function getUpdateCourse(req, res, next) {
  try {
    const course_id = parseInt(req.params.course_id, 10);
    const year = parseInt(req.params.year, 10);
    const semester = req.params.semester;

    const dbCourse = await db.getCourse(semester, year, course_id);
    if (!dbCourse) {
      const error = new Error("Course not found");
      error.status = 404;
      throw error;
    }
    console.log(dbCourse);
    res.render("updateCourse", { course: dbCourse });
  } catch (err) {
    next(err);
  }
}

async function postUpdateCourse(req, res, next) {
  try {
    const { name, description, code } = req.body;
    const course_id = parseInt(req.params.course_id, 10);

    await db.updateCourse(course_id, name, description, code);
    res.redirect("../");
  } catch (err) {
    next(err);
  }
}

async function getUpdateSemester(req, res, next) {
  try {
    const semester = req.params.semester;
    const year = parseInt(req.params.year, 10);

    const dbSemester = await db.getSemester(semester, year);
    if (!dbSemester) {
      const error = new Error("Semester Not Found");
      error.status = 404;
      throw error;
    } else {
      res.render("updateSemester", {
        semester: dbSemester.semester,
        year: dbSemester.year,
      });
    }
  } catch (err) {
    next(err);
  }
}

async function postUpdateSemester(req, res, next) {
  try {
    const {semester, year} = req.body;
    console.log(req.body);
    const semester_id = await db.getSemesterId(req.params.semester, parseInt(req.params.year, 10));
    await db.updateSemester(semester_id, semester, year);

    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  postUpdateCourse,
  getUpdateCourse,
  getUpdateSemester,
  postUpdateSemester,
};
