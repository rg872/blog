const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const ArticleSchema  = Schema({
    title: String,
    content: String
},{
    timestamps:true
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article