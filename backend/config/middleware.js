
const morgan = require("morgan");
const logger = require("../utils/logger");


const logMiddleware = morgan("dev", {
  stream: { write: (message) => logger.info(message) },
});

module.exports = {
  logMiddleware,
};
