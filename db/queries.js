const pool = require("./pool");

async function getSemester(semester = "", year = "") {
  const { rows } = await pool.query(
    "SELECT * FROM semesters LEFT JOIN courses ON courses.semester_id = semesters.id WHERE semester = $1 AND year = $2",
    [semester, year]
  );
  return rows[0];
}

async function getSemesters() {
  const { rows } = await pool.query(
    "SELECT * FROM semesters"
  );
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
  const { rows } = await pool.query("SELECT * FROM courses JOIN semesters ON courses.semester_id = semesters.id WHERE courses.id = $1 AND semester = $2 AND year = $3", [
    course_id, semester, year
  ]);
  return rows[0];
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

module.exports = { getSemester, getSemesters, getCourses, getCourse };
