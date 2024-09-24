module.exports = (err, req, res, next) => {
  console.log(err);
  if (err.status == 404) {
    return res.status(404).render("error", { message: "page not found" });
  }

  res.status(err.status).render("error", { message: "internal server error" });
};
