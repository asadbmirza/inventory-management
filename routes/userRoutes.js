const { Router } = require("express");

const userRouter = Router({ mergeParams: true });
const userController = require("../controllers/userController");
const removeController = require("../controllers/removeController");

userRouter.get("/", userController.getSemester);

// userRouter.post("/create", userController.createSemester);
// userRouter.patch("/update", userController.updateSemester);
userRouter.delete("/delete", removeController.deleteSemester)

userRouter.get("/:course_id/", userController.getCourse);
// userRouter.post("/:course_id/create", userController.createCourse);
// userRouter.patch("/:course_id/update", userController.updateCourse);
userRouter.post("/:course_id/delete", removeController.deleteCourse);

module.exports = userRouter;