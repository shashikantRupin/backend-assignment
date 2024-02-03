// config/middleware.js
const morgan = require("morgan");
const logger = require("../utils/logger");

// Middleware for logging
const logMiddleware = morgan("dev", {
  stream: { write: (message) => logger.info(message) },
});

module.exports = {
  logMiddleware,
};
