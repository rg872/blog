const Article = require('../models/articles.model')
const User = require('../models/users.model')
const decodeJwt = require('../helpers/decode-jwt')


module.exports = {
    addArticle: function(req, res){
        let decoded = decodeJwt.decoding(req.body.token);

        if(decoded.role !== 'admin'){
            res.status(400).json({
                message: 'only admin can create new article'
            })
        }else{
            
            let new_article = {
                title: req.body.title,
                content: req.body.content

            }  

            Article.create(new_article)
            .then((article)=>{           

                User.findOne({email: decoded.email})
                .then((user)=>{
                    user.articles.push(article);
                    
                    user.save()
                    .then((user)=>{
                        res.status(200).json({
                            message: 'success create new article',
                            article: article
                        })
                    })                               
                })
                
            })        
            .catch((error)=>{
                res.status(500).json({
                    message: 'server error'
                })
            })
        }  
    },

    getAllArticle: function(req, res){
        Article.find({})
        .then((articles)=>{
            res.status(200).json({
                message: 'success get all article',
                articles: articles
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
    },

    getArticleByEmail: function(req, res){
        let email = decodeJwt.decoding(req.body.token).email;
        
        User.findOne({email: email})
        .populate('articles')
        .then((user)=>{
            res.status(200).json({
                message: 'success get articles',
                articles: user.articles
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
    },

    updateArticleById: function(req, res){

    },

    deleteArticleById: function(req, res){

    }
}