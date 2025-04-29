const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
let post = [
    {id:1, title: 'post 1'},
    {id:2, title: 'post 2'},
    {id:3, title: 'post 3'},
    {id:4, title: 'post 4'},
    {id:5, title: 'post 5'},
    {id:6, title: 'post 6'},
    {id:7, title: 'post 7'},
    {id:8, title: 'post 8'},
    {id:9, title: 'post 9'},
    {id:10, title: 'post 10'},
]
//static folder
app.use(express.static(path.join(__dirname, 'public')));
//get posts
app.get('/api/posts', (req, res) => {
    const limit = parseInt(req.query.limit);
    if(!isNaN(limit) && limit > 0) {
       return res.status(200).json(post.slice(0, limit));
    }
       return res.status(200).json(post);

})

//get single post
app.get('/api/posts/:id', (req, res) => {
    const id = Number(req.params.id);
    const post = post.find(post => post.id === id);
    if(!post){
       return res.status(404).json({error: `Post with that ${id} doesn't exist'}`})
    }
       return res.status(200).json(post);

})
app.listen(port, () => {
    console.log('listening to port 8089');
})
