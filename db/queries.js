const pool = require("./pool");

async function getSemesterId(semester, year) {
  const { rows } = await pool.query(
    "SELECT id FROM semesters WHERE semester = $1 AND year = $2",
    [semester, year]
  );
  return rows[0].id;
}

async function getSemester(semester = "", year = "") {
  const { rows } = await pool.query(
    "SELECT * FROM semesters LEFT JOIN courses ON courses.semester_id = semesters.id WHERE semester = $1 AND year = $2",
    [semester, year]
  );
  return rows[0];
}

async function getSemesters() {
  const { rows } = await pool.query("SELECT * FROM semesters");
  return rows;
}

async function getCourses(semester = "", year = "") {
  const { rows } = await pool.query(
    "SELECT courses.id, name, code, description FROM semesters LEFT JOIN courses ON courses.semester_id = semesters.id WHERE semester = $1 AND year = $2",
    [semester, year]
  );
  return rows;
}

async function getCourse(semester, year, course_id) {
  const { rows } = await pool.query(
    "SELECT * FROM courses JOIN semesters ON courses.semester_id = semesters.id WHERE courses.id = $1 AND semester = $2 AND year = $3",
    [course_id, semester, year]
  );
  return rows[0];
}

async function deleteCourse(course_id) {
  await pool.query("DELETE FROM courses WHERE id = $1", [course_id]);
}

async function deleteSemester(semester, year) {
  const id = await getSemesterId(semester, year);
  await pool.query("DELETE FROM semesters WHERE semesters.id = $1", [
    id,
  ]);
  await pool.query("DELETE FROM courses WHERE semester_id = $1", [semester_id]);
}

async function insertSemester(semester, year) {
  await pool.query("INSERT INTO semesters (semester, year) VALUES ($1, $2)", [
    semester,
    year,
  ]);
}

async function insertCourse(course) {
  await pool.query(
    "INSERT INTO courses (code, name, description, subject, semester_id) VALUES ($1, $2, $3, $4, $5)",
    [
      course.code,
      course.name,
      course.description,
      course.subject,
      course.semester_id,
    ]
  );
}

async function updateCourse(course_id, name, description, code) {
  await pool.query(
    "UPDATE courses SET name = $2, description = $3, code = $4 WHERE id = $1",
    [course_id, name, description, code]
  );
}

async function updateSemester(semester_id, semester, year) {
  await pool.query(
      "UPDATE semesters SET semester = $1, year = $2 WHERE id = $3",
      [semester, year, semester_id]
  );

}

module.exports = {
  getSemesterId,
  getSemester,
  getSemesters,
  getCourses,
  getCourse,
  deleteCourse,
  deleteSemester,
  updateCourse,
  updateSemester,
};
