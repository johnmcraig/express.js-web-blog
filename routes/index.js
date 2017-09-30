var express = require('express');
var router = express.Router();
var repo = require("../models/postRepository");
repo.loadPosts();

/* GET home page. */
router.get('/', function (req, res, next) {
  var posts = repo.getPosts();

  res.render('index', { title: "My Blog Posts", posts: posts });
});

module.exports = router;