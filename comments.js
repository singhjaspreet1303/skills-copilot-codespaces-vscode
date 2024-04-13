// Create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Get all comments
app.get('/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(comments);
    }
  });
});

// Post a comment
app.post('/comments', (req, res) => {
  const comment = new Comment();
  comment.author = req.body.author;
  comment.text = req.body.text;
  comment.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(comment);
    }
  });
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});