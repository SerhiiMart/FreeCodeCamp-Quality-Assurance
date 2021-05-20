/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const Book = require('../models').Book;
const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../database-conection');

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      await Book.find({}, (error, data) => {
        if(error) return console.error(data)
        res.json(data)
      })
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      let book = new Book({title: title})
      //response will contain new book object including atleast _id and title
      await book.save((error, data) => {
        if(error) return res.json("missing required field title")
        res.json({
          _id: data._id,
          title: data.title
        })
      })
    })
    
    .delete(async function(req, res){
      //if successful response will be 'complete delete successful'
      await Book.deleteMany({}, (error, data) => {
          (error || !data) ? res.send("Error!") : res.json('complete delete successful')
        })
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
     await Book.findById(bookid, (error, data) => {
       (error || !data) ? res.json("no book exists") : res.json(data)
        })
    })
    
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if(!comment) {
        res.json("missing required field comment")
      } else if(!ObjectId.isValid(bookid)) {
        res.json("no book exists")
      } else {
        let book = await Book.findById(bookid)
        if(!book) return res.json("no book exists")
        await Book.findByIdAndUpdate(bookid, {
          $push: {comments: comment},
          $inc: {commentcount: 1}
        })
        await Book.findById(bookid, (error, data) => {
          res.json(data)
        })
      }
    })
    
    .delete(async function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      if(!ObjectId.isValid(bookid)) return res.json("no book exists");
      await Book.findByIdAndRemove(bookid, (error, data) => {
        (error || !data) ? res.send('no book exists') 
        : res.json('delete successful');
      })
    });
};
