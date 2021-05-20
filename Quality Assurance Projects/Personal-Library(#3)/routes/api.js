/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const Book = require('../models').Books;

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      Book.find({}, (error, data) => {
        if (!data) {
          res.json([]);
        } else {
          const workOnData = data.map((book) => {
            return {
              _id: book._id, 
              title: book.title, 
              comments: book.comments,
              commentcount: book.comments.length
            }
          })
          res.json(workOnData);
        }
      })
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        res.send("Missing required title");
        return;
      }
      const newBook = new Book({title, comments : []});
      newBook.save((error, data) => {
        (error || !data) ? "Error. Missing data"
        : res.json({_id: data._id, title: data.title});
      })
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
        Book.remove({}, (error, data) => {
          (error || !data) ? res.send("Error!") : res.send('complete delete successful');
        })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      Book.findById(bookid, (error, data) => {
        if (error || !data) {
          res.send("There is no such a book")
        } else {
          res.json({
              _id: data._id, 
              title: data.title, 
              comments: data.comments,
              commentcount: data.comments.length
          })
        }
      })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment) {
        res.send("Missing required field comment");
        return;
      }
      Book.findById(bookid, (error, bookData) => {
        if (error || !bookData) {
          res.send('No such a book');
        } else {
          bookData.comments.push(comment);
          bookData.save((error, saveData)=> {
            res.json({
              _id: saveData._id, 
              title: saveData.title, 
              comments: saveData.comments,
              commentcount: saveData.comments.length
          });
          })
        }
        
      })
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      Book.findByIdAndRemove({}, (error, data) => {
        (error || !data) ? res.send("Error!") : res.send('delete successful');
      })
    });
  
};
