const allowedOrigins = require("./allowedOrigin");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by CORS"));
    }
  },
  Credential: true,
  optionsSuccessStatus: 200,
};
module.exports = corsOptions;
