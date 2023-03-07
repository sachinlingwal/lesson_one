const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${req.name}\t${req.message}\treq.method}\t${req.url}\t${req.headers.origin}`,
    "reqLog.log"
  );
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500; //server error

  res.status(status);

  res.json({ message: err.message });
};
module.exports = errorHandler;
