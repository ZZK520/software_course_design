const mongoose = require("mongoose");
const db = require("../models");
const relate_user_book = function (userId, book) {
  return new Promise(async function (resolve, reject) {
    try {
      let user_id = mongoose.Types.ObjectId(userId);
      const user = await db.user.findByIdAndUpdate(
        user_id,
        { $push: { books: book._id } },
        { new: true, useFindAndModify: false }
      );
      console.log('user',user);
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};
exports.relate_user_book = relate_user_book;
