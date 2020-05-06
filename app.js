const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/articles');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();


// const url = "mongodb+srv://eazytsa:20mylab19?@cluster0-3t4zu.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect('mongodb://172.15.22.251/blog', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });


// middle-ware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    // respond with Hello World
    // res.send('Hello World');
    // #################################
    // respond with views-html
    // res.render('index');
    const articles =  await Article.find().sort({ createdAt: 'desc' });
    // [{
    //     // title:String,
    //     title: 'First Article',
    //     createdAt: new Date(),
    //     description: 'Testing desc'
    // },
    // {
    //     title: 'Second Article',
    //     createdAt: new Date(),
    //     description: 'Testing desc2'
    // }];
    res.render('articles/index', { articles: articles });
});

// put the articles router to be accessed via /articles
app.use('/articles', articleRouter);

app.listen(3000);