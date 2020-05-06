const express = require('express');
const Article = require('./../models/articles');
const router = express.Router();

// ######################################GET###########################################################
// to access this routes....go via /articles or any routes in this file goes via /articles
router.get('/new', (req, res) => {
    // res.send('In Articles');
    res.render('articles/new', { article: new Article() });
});

// redirecting the page from form post - mongo save
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if(article == null) res.redirect('/');
    res.render('articles/show', {  article: article });
});
// also this path can be accessed via /articles/test
// router.get('/test', (req, res) => {
//     res.send('In Articles');
// #######################################POST##########################################################
router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    });
    try {
        article = await article.save();
        res.redirect(`/articles/${article.slug}`);
    }catch (err) {
        console.log(err);
        res.render('articles/new', { article:article });
    }
});


// ############################################DELETE#######################################################
// note a form only has two methods="GET/POST"
// the following route is from methodOverride module
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
});


// export the router to be accessed by other files mainly the index page
module.exports = router;