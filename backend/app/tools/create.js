const db = require("../models");
const createSingleBook = function (owner,book) {
  return new Promise((function(resolve,reject){
    let userId=owner;
    let promise=db.book.create(book);
    promise.then(function(docBook){
      db.user.findByIdAndUpdate(
        userId,
        { $push: { books: docBook._id } },
        { new: true, useFindAndModify: false },
        function (err, model) {
          if (err) {
             reject(err);
          }
           resolve(model);
        }
      );
    })
  
  }))
 
    
  // return new Promise(function (resolve, reject) {
  //   db.book.create(book,function(err,docBook) {
  //     if (err) {
  //       return reject(err);
  //     }
  //     console.log("\n>> Created Book:\n", docBook);
  //     return resolve(docBook)
  //     db.user.findByIdAndUpdate(
  //       userId,
  //       { $push: { books: docBook._id } },
  //       { new: true, useFindAndModify: false },
  //       function (err, model) {
  //         if (err) {
  //           return reject(err);
  //         }
  //         return resolve(model);
  //       }
  //     );
  //   });
  // });
};
exports.MethodCreateSingleBook = createSingleBook;
