const { Router } = require("express");

const userRouter = Router({ mergeParams: true });
const userController = require("../controllers/userController");
const removeController = require("../controllers/removeController");
const updateController = require("../controllers/updateController");

userRouter.get("/", userController.getSemester);
//userRouter.post("/create", userController.createSemester);
userRouter.get("/update", updateController.getUpdateSemester);
userRouter.post("/update", updateController.postUpdateSemester);
userRouter.delete("/delete", removeController.deleteSemester)

userRouter.get("/:course_id/", userController.getCourse);
// userRouter.post("/:course_id/create", userController.createCourse);
userRouter.get("/:course_id/update", updateController.getUpdateCourse);
userRouter.post("/:course_id/update", updateController.postUpdateCourse);
userRouter.post("/:course_id/delete", removeController.deleteCourse);

module.exports = userRouter;