// routes/bookRoutes.js
const express = require("express");
const bookController = require("../controllers/booksController");
const { logMiddleware } = require("../config/middleware");

const router = express.Router();

router.get("/", logMiddleware, bookController.getAllBooks);
router.post("/", logMiddleware, bookController.createBook);
router.delete("/delete/:id", logMiddleware, bookController.deleteBook);

module.exports = router;
