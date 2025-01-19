// models/book.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db"); // Your sequelize instance

class Book extends Model {}

Book.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, modelName: "Book" }
);

module.exports = Book;
