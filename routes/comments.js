const express = require('express');
const router = express.Router({mergeParams: true});
const Blog = require('../models/blog'),
      Comment = require('../models/comment');

router.get('/new', (req, res) => { 
  Blog.findById(req.params.id, (err, data) => { 
    if(!err) res.render('comments/new', {blog: data});
  })
})

router.post('/', (req, res) => { 
  const {author, text} = req.body;
  Blog.findById(req.params.id, (err, blog) => { 
    if(err) return res.send({error: 'Something went wrong'});
    Comment.create({author, text}, (err, comm) => { 
      // console.log(comm, blog);
      blog.comments.push(comm); 
      blog.save();
      res.redirect(`/blogs/${blog._id}`);
    })
  })
  // console.log(req.body);
})

router.delete('/:commId', (req, res) => { 
  Blog.findById(req.params.id, (err, blog) => { 
    if(err) return res.send({response: 'something went wrong'});
    for(let i = 0; i < blog.comments.length; i++) { 
      if(blog.comments[i]._id == req.params.commId) blog.comments.splice(i, 1);
    }
    blog.save();
    Comment.findByIdAndRemove(req.params.commId, (err, comm) => { 
      if(err) return res.send({response: 'something went wrong'});
    })
    res.redirect(`/blogs/${req.params.id}`);
  })
})

module.exports = router;