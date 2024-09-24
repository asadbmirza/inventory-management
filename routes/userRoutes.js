const { Router } = require("express");

const userRouter = Router({ mergeParams: true });
const userController = require("../controllers/userController");

userRouter.get("/", userController.getSemester);

// userRouter.post("/create", userController.createSemester);
// userRouter.patch("/update", userController.updateSemester);
// userRouter.delete("/delete", userController.deleteSemester)

userRouter.get("/:course_id/", userController.getCourse);
// userRouter.post("/:course_id/create", userController.createCourse);
// userRouter.patch("/:course_id/update", userController.updateCourse);
// userRouter.delete("/:course_id/delete", userController.deleteCourse);

module.exports = userRouter;