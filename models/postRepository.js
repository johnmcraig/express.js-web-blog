var fs = require('fs'),
    path = require('path');

var filePath = path.join(__dirname, 'data');
var fileName = path.join(filePath, 'postData.json');

var postList = [];

var loadPosts = function loadPosts() {
    if (postList.length < 1) {
        fs.stat(fileName, (err, stat) => {
            if (err) {
                console.log("Could not find posts file. " + err.message);
                savePosts;
            } else {
                fs.readFile(fileName, 'utf8', (err, data) => {
                    if (err) {
                        console.log("Could not find posts file" + err.message);
                        throw err;
                    }

                    var newPosts = JSON.parse(data);
                    if (newPosts.length > 0) {
                        postList = newPosts;
                        console.log("Loaded! " + postList.length);
                    }

                });
            }
        });
    }
};

var writeFile = function writeFile() {
    var json = JSON.stringify(postList);
    fs.writeFile(fileName, json, (err) => {
        if (err) {
            console.log("Error writing file. " + err.message);
            throw err;
        }
        console.log("The file has been saved.");
    });
};


var savePosts = function savePosts() {
    fs.stat(filePath, (err, stat) => {
        if (err) {
            fs.mkdir(filePath, (err) => {
                console.log("Error creating directory. " + err.message);
                writeFile();
            });
        } else {
            writeFile();
        }
    });
};

var repo = {
    postCount: postList.length,

    getPosts: () => {
        if (postList.length < 1) {
            loadPosts();
        }
        return postList;
    },
    getPostById: (postId) => {
        if (postList.length < 1) {
            loadPosts();
        }
        return postList.find((post) => {
            return post.id == postId;
        });
    },
    addPost: (newPost) => {
        if (postList.length < 1) {
            loadPosts();
        }
        postList.push(newPost);
        savePosts();
    },
    savePosts: savePosts,
    writeFile: writeFile,
    loadPosts: loadPosts
};

loadPosts();

module.exports = repo;