const errorMiddleware = (error, errorMessage, res) => {
  console.error(error);
  res.status(500).send({ error: errorMessage || "Something went wrong eh!!" });
};

module.exports = errorMiddleware
