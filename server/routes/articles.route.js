const express = require('express');
const router = express.Router();

const ArticleController = require('../controllers/articles.controller')

router.post('/add', ArticleController.addArticle);
router.get('/all', ArticleController.getAllArticle);
router.post('/user', ArticleController.getArticleByEmail);
router.put('/update', ArticleController.updateArticleById);
router.delete('/delete', ArticleController.deleteArticleById);

module.exports = router;
