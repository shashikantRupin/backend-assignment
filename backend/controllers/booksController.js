
const Book = require("../models/book");
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      return res
        .status(400)
        .json({ message: "Title and Author are required fields" });
    }

    const newBook = new Book({ title, author });
    const savedBook = await newBook.save();

    res.json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(deletedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  deleteBook,
};
