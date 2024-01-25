const mongoose = require("mongoose");

const { Schema } = mongoose;

const BookListingSchema = new Schema({
  BookTitle: {
    type: String,
    required: [true, "Book Title is required"],
  },
  addLogoURL: {
    type: String,
  },
  Price: {
    type: Number,
    required: [true, "Book Price is required"],
  },
  Author: {
    type: String,
    required: [true, "Author is required"],
  },
  PublicationYear: {
    type: Number,
    required: [true, "Publication Year is required"],
  },
  bookDescription: {
    type: String,
    required: [true, "Book description is required"],
  },
  createdAt: { type: Date, default: Date.now },
});
BookListingSchema.index({ BookTitle: 1 });
BookListingSchema.index({ Price: 1 });
BookListingSchema.index({ Author: 1 });
const bookListingModel = mongoose.model("BookListing", BookListingSchema);

module.exports = bookListingModel;
