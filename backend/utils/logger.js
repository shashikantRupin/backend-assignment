// utils/logger.js
const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
});

module.exports = logger;
