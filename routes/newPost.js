var express = require('express'),
    router = express.Router(),
    repo = require('../models/postRepository');

/* Get request page */
router.get('/', function (req, res, next) {
    res.render('newpost', {
        title: "New Post"
    });
});


router.post('/', function (req, res, next) {
    var newPost = {};
    newPost.id = req.body.id;
    newPost.title = req.body.title;
    newPost.author = {};
    newPost.author.firstName = req.body.firstName;
    newPost.author.lastName = req.body.lastName;
    newPost.author.email = req.body.email;
    newPost.pubDate = req.body.pubDate;
    newPost.content = req.body.content;

    repo.addPost(newPost);

    res.redirect('/');


    // res.send("Done!" + req.body.id);
});


module.exports = router;