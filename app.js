const express        = require('express'),
      app            = express(),
      mongoose       = require('mongoose'),
      methodOverride = require('method-override');
      blogsRoute     = require('./routes/blogs'),
      commentsRoute  = require('./routes/comments'),

mongoose.connect('mongodb://localhost/restfullApp', {useNewUrlParser: true, useUnifiedTopology: true}); 

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => { 
  res.redirect('/blogs');
}); 

app.use('/blogs', blogsRoute);
app.use('/blogs/:id/comments', commentsRoute);

app.listen(process.env.PORT || 3000, () => { 
  console.log('app running');
});