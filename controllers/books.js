const BookListing = require("../models/bookListingModel");

exports.addBook = async (req, res) => {
  try {
    const {
      BookTitle,
      addLogoURL,
      Price,
      Author,
      PublicationYear,
      bookDescription,
    } = req.body;

    // Check if all the required fields are provided
    if (
      !BookTitle ||
      !addLogoURL ||
      !Price ||
      !Author ||
      !PublicationYear ||
      !bookDescription
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const updatedLogoURL = req.body.addLogoURL
      ? req.body.addLogoURL
      : "https://eu.ui-avatars.com/api/?name=John+Doe&size=250";

    // Create a new Book listing
    const newBookListing = new BookListing({
      BookTitle,
      addLogoURL: updatedLogoURL,
      Price,
      Author,
      PublicationYear,
      bookDescription,
    });

    await newBookListing.save();

    res.status(201).json({ message: "Book details added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const {
      BookTitle,
      addLogoURL,
      Price,
      Author,
      PublicationYear,
      bookDescription,
    } = req.body;

    // Check if all the required fields are provided
    if (
      !BookTitle ||
      !addLogoURL ||
      !Price ||
      !Author ||
      !PublicationYear ||
      !bookDescription
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const updatedLogoURL = req.body.addLogoURL
      ? req.body.addLogoURL
      : "https://eu.ui-avatars.com/api/?name=John+Doe&size=250";

    // Find the existing Booklisting by ID
    const bookListing = await BookListing.findById(bookId);

    if (!bookListing) {
      return res.status(404).json({ error: "Book details not found" });
    }

    // Update the book details fields
    bookListing.BookTitle = BookTitle;
    bookListing.addLogoURL = updatedLogoURL;
    bookListing.Price = Price;
    bookListing.Author = Author;
    bookListing.PublicationYear = PublicationYear;
    bookListing.bookDescription = bookDescription;

    // Save the updated book details
    await bookListing.save();

    res.status(200).json({ message: "Book details updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBook = async (req, res) => {
  try {
    // Find Book listings that match the filter
    const bookListings = await BookListing.find();

    res.status(200).json({ bookListings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOneBook = async (req, res) => {
  try {
    const { id: bookId } = req.params;

    // Find the Book listing by ID
    const bookListing = await BookListing.findById(bookId);

    if (!bookListing) {
      return res.status(404).json({ error: "Book details not found" });
    }

    res.status(200).json({ bookListing });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id: bookId } = req.params;

    // Find the existing Booklisting by ID
    const bookListing = await BookListing.findById(bookId);

    if (!bookListing) {
      return res.status(404).json({ error: "Book details not found" });
    }

    // Delete the book details
    await bookListing.deleteOne();

    res.status(200).json({ message: "Book details deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
