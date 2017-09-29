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
    res.send("Done!" + req.body.id);
});


module.exports = router;