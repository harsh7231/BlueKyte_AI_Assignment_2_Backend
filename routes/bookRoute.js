const express = require("express");
const authenticateUser = require("../middleware/auth");
const {
  addBook,
  updateBook,
  getAllBook,
  getOneBook,
  deleteBook,
} = require("../controllers/books");

const bookRouter = express.Router();

bookRouter.route("/book-posting").post(authenticateUser, addBook);
bookRouter.route("/book-posting/:id").put(authenticateUser, updateBook);
bookRouter.route("/books").get(getAllBook);
bookRouter.route("/books/:id").get(getOneBook);
bookRouter.route("/:id").delete(authenticateUser, deleteBook);

module.exports = bookRouter;
