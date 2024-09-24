const db = require("../db/queries");

async function getIndex(req, res, next) {
    try {
        const semesters = await db.getSemesters();
        if (!semesters || semesters.length == 0) {
            const error = new Error("Semesters Not Found");
            error.status = 404;
            throw error;
        } else {
            console.log(semesters);
            res.render("index", {semesters: semesters});
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {getIndex: getIndex};