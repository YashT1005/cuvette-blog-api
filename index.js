const express = require('express')
const db = require('./config/db')
const Post = require('./models/Post')

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

db().then(() => {
    console.log("Successfully connected to the db");
}).catch(err => console.log(err));


// to check the health of the api
app.get('/api/', (req, res) => {
    res.status(200).json({ message: "Api is Working fine !" })
})

// fetching all the posts
app.get('/api/posts', (req, res) => {
    Post.find({}).then((data) => {
        res.status(200).json({ data });
    }).catch((err) => {
        res.status(500).json({ message: err });
    });
})

// get a specific post
app.get('/api/posts/:id', (req, res) => {
    let postid = req.params.id;
    Post.find({ _id: postid }).then((data) => {
        res.status(200).json({ data });
    }).catch((err) => {
        res.status(500).json({ message: err });
    });
})


// create a new post
app.post('/api/posts/', (req, res) => {

    let newPost = new Post({
        title: req.body.title,
        description: req.body.description
    })

    newPost.save().then((data) => {
        res.status(200).json({ message: "Post created successfully !" });
    }).catch((err) => {
        res.status(500).json({ message: err });
    });

})


// Updating a specific post
app.put('/api/posts/:id', (req, res) => {
    let postid = req.params.id;
    let newinfo = {
        title: req.body.title,
        description: req.body.description
    }
    Post.findByIdAndUpdate(postid, newinfo).then((data) => {
        res.status(200).json({ message: "Post updated successfully !" });
    }).catch((error) => {
        res.status(500).json({ message: err });
    })
})


// Deleting a specific post
app.delete('/api/posts/:id', (req, res) => {
    let postid = req.params.id;
    Post.findByIdAndDelete(postid).then((data) => {
        res.status(200).json({ message: "Post Deleted successfully !" });
    }).catch((error) => {
        res.status(500).json({ message: err });
    })
})


app.listen(port, (err) => {
    if (!err) {
        console.log(`Server is running on port ${port}`);
    }
})