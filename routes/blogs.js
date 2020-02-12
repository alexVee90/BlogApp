const express = require('express'),
      router  = express.Router();
const Blog = require('../models/blog');

router.get('/', (req, res) => { 
  Blog.find({}, (err, data) => {
    !err ? res.render('blogs/index', {blogList: data}) : console.log(err);
  })
})

router.get('/new', (req, res) => { 
  res.render('blogs/new');
})

router.post('/', (req, res) => { 
  const {title, image, desc} = req.body; 
  Blog.create({title, image, desc}, (err, data) => { 
    !err ? res.redirect('/blogs') : res.redirect('/blogs/new');
  }); 
})

router.get('/:id', (req, res) => { 
  Blog.findById(req.params.id).populate('comments').exec((err, data) => { 
    res.render('blogs/details', {blog: data});
  })
});

router.get('/:id/edit', (req, res) => { 
  Blog.findById(req.params.id, (err, data) => { 
    res.render('blogs/edit', {blog: data});
  })
});

router.put('/:id', (req, res) => { 
  const {title, image, desc} = req.body; 
  Blog.findByIdAndUpdate(req.params.id, {title, image, desc}, (err, data) => { 
    res.redirect(`/blogs/${req.params.id}`)
  })
})

router.delete('/:id', (req, res) => { 
  Blog.findByIdAndRemove(req.params.id, (err) => { 
    if(!err) res.redirect('/blogs');
  })
})

module.exports = router;
