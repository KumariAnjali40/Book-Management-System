const { UserModel } = require("../models/user.model");
const { BookModel } = require("../models/book.model");
const { BorrowModel } = require("../models/borrow.model");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth.middleware");
const { access } = require("../middleware/access.middleware");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    getUsers: async (_, __, context) => {
      access(context, ["admin"]);
      return await UserModel.find();
    },
    getBooks: async (_, __, context) => {
      access(context, ["admin", "reader"]);
      return await BookModel.find();
    },
    getUser: async (_, { id }, context) => {
      access(context, ["admin"]);
      return await UserModel.findById(id);
    },
    getBook: async (_, { id }, context) => {
      access(context, ["admin", "reader"]);
      return await BookModel.findById(id);
    },
  },
  Mutation: {
    registerUser: async (_, { name, email, pass, city, age, role }) => {
      const hashedPassword = await bcrypt.hash(pass, 10);
      const user = new UserModel({
        name,
        email,
        pass: hashedPassword,
        city,
        age,
        role,
      });
      await user.save();
      return user;
    },
    loginUser: async (_, { email, pass }) => {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      const validPassword = await bcrypt.compare(pass, user.pass);
      if (!validPassword) {
        throw new Error("Invalid password");
      }
      const access_token = jwt.sign({ userID: user._id }, "Anjali", {
        expiresIn: "1h",
      });
      const refresh_token = jwt.sign({ userID: user._id }, "Anjali", {
        expiresIn: "2h",
      });
      return { access_token, refresh_token };
    },
    logoutUser: async (_, __, context) => {
      const { authorization } = context.headers;
      const access_token = authorization?.split(" ")[1];
      const refresh_token = authorization?.split(" ")[2];
      const blacklist = new BlackListModel({ access_token, refresh_token });
      await blacklist.save();
      return { msg: "User logged out" };
    },
    addBook: async (
      _,
      { title, genre, author, published_year },
      auth,
      context
    ) => {
      access(context, ["admin", "librarian"]);
      const book = new BookModel({ title, genre, author, published_year });
      await book.save();
      return book;
    },
    borrowBook: async (_, { id }, context) => {
      access(context, ["reader", "admin"]);
      const book = await BookModel.findById(id);
      if (!book) {
        throw new Error("Book not found");
      }
      if (book.owner) {
        throw new Error("Book is already borrowed");
      }
      const borrow = new BorrowModel({
        book: book._id,
        borrower: context.user._id,
        borrowedAt: new Date(),
      });
      await borrow.save();
      book.owner = context.user._id;
      await book.save();
      return { msg: "Book borrowed successfully" };
    },
    buyBook: async (_, { id }, context) => {
      access(context, ["reader", "admin"]);
      const book = await BookModel.findById(id);
      if (!book) {
        throw new Error("Book not found");
      }
      if (book.owner && book.owner.equals(context.user._id)) {
        throw new Error("You already own this book");
      }
      if (!book.owner) {
        book.owner = context.user._id;
        await book.save();
        return { msg: "Book purchased successfully" };
      } else {
        throw new Error("Book is not available for purchase");
      }
    },
    updateUser: async (_, { id, name, email, city, age, role }) => {
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { name, email, city, age, role },
        { new: true }
      );
      if (!updatedUser) {
        throw new Error("User not found");
      }
      return updatedUser;
    },
    deleteUser: async (_, { id }) => {
      const deletedUser = await UserModel.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new Error("User not found");
      }
      return { msg: "User deleted successfully" };
    },
    updateBook: async (_, { id, title, genre, author, published_year }) => {
      const updatedBook = await BookModel.findByIdAndUpdate(
        id,
        { title, genre, author, published_year },
        { new: true }
      );
      if (!updatedBook) {
        throw new Error("Book not found");
      }
      return updatedBook;
    },
    deleteBook: async (_, { id }) => {
      const deletedBook = await BookModel.findByIdAndDelete(id);
      if (!deletedBook) {
        throw new Error("Book not found");
      }
      return { msg: "Book deleted successfully" };
    },
  },
};

module.exports = resolvers;
