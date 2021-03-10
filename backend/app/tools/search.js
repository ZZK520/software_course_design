const mongoose = require("mongoose");

const db = require("../models");
const searchUserById = async function (id) {
  const userId = mongoose.Types.ObjectId(id);
  return new Promise(function (resolve, reject) {
    db.user.findById(userId, function (error, data) {

      if (error) {
        return reject(error);
      }
      return resolve(data);
    });
  });
};
const searchBookById = async function (id) {
  const book = mongoose.Types.ObjectId(id);
  // console.log("book", book);
  return new Promise(function (resolve, reject) {
    db.book.findById(book, function (error, data) {

      if (error) {
        return reject(error);
      }
      return resolve(data);
    });
  });
};
const searchUserByID = function (id) {

  return new Promise(function (resolve, reject) {
    db.employees.findOne({ ID: id }, function (error, data) {

      if (error) {
        return reject(error);
      }
      return resolve(data);
    });
  });
};

exports.searchUserById = searchUserById;
exports.searchBookById = searchBookById;
exports.searchUserByID = searchUserByID;
