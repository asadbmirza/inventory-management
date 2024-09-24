const db = require("../db/queries");



async function deleteSemester(req, res, next) {
    try {
        const year = parseInt(req.params.year, 10);
        const semester = req.params.semester;
        await db.deleteSemester(semester, year);
        res.redirect("/");

    } catch (error) {
        next(error);
    }
}

async function deleteCourse(req, res, next) {
    try {
        const course_id = parseInt(req.params.course_id, 10);
        console.log(course_id);
        await db.deleteCourse(course_id);
        res.redirect("/");

    } catch (error) {
        next(error);
    }
}

module.exports = {deleteCourse, deleteSemester}