const db = require("../db/queries");



async function getSemester(req, res, next) {
    try {
        const semester = req.params.semester;
        const year = parseInt(req.params.year, 10);

        const dbSemester = await db.getSemester(semester, year);
        const dbCourses = await db.getCourses(semester, year);
        console.log(dbCourses)
        if (!dbSemester) {
            const error = new Error("Semester Not Found");
            error.status = 404;
            throw error;
        }
        else {
            res.render("semester", {semester: dbSemester.semester, year: dbSemester.year, courses: dbCourses});
        }

        
    } 
    catch (err) {
        next(err);
    }
}

async function getCourse(req, res, next) {
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

        res.render("course", {course: dbCourse});

    } catch(err) {
        next(err);
    }
}

module.exports = {
    getSemester: getSemester,
    getCourse: getCourse
}