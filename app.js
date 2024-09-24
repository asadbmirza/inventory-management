const express = require("express");

const app = express();
const userRouter = require("./routes/userRoutes");
const error = require("./routes/error");
const indexRouter = require("./routes/indexRoute");
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));


app.use("/:semester/:year", userRouter);
app.use("/", indexRouter);
app.use(error);


app.listen(3000, () => console.log("listening on 3000"));