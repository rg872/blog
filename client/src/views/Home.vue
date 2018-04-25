<template>  
<div class="container">
  <router-view></router-view>
  <div class="d-flex justify-content-around">
    <div v-for="(article, index) in articles" :key="index">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="http://tyronneratcliff.com/wp-content/uploads/2015/04/article-writing-software.png" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{ article.title }}</h5>
          <p class="card-text">{{ article.content }}</p>
          <button class="btn btn-danger">Delete</button>
          <button class="btn btn-warning">Edit</button>
          <router-link class="btn btn-primary" :to="{ name: 'detail', params: { article: article } }">Detail</router-link>
        </div>
      </div>      
    </div>
  </div>
  <button class="btn btn-success" data-toggle="modal" data-target="#exampleModal">Create New Article</button>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control" v-model="title" placeholder="Insert title">
          </div>
          <div class="form-group">
            <label>Content</label>
            <input type="text" class="form-control" v-model="content" placeholder="Insert content">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="saveArticle">Save article</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import axios from 'axios'

export default {
  name: 'home',
  components: {
    //HelloWorld
  },
  data: function(){
    return {
      articles: [],
      title : '',
      content : ''
    }
  },
  methods: {
    saveArticle: function () {
      axios.post('http://localhost:3000/article/add',{
        title: this.title,
        content: this.content,
        token: localStorage.getItem('token')
      })
      .then((res)=>{
        this.articles.push(res.data.article)        
      })
      .catch((err)=>{
        alert('Sorry there is something wrong with the server')
      })
    }
  },
  beforeCreate: function(){
    if(!localStorage.getItem('token')){
      this.$router.push('/sign-user')
    }else{
      axios.get('http://localhost:3000/article/all')
      .then((res)=>{
        this.articles = res.data.articles        
      })
      .catch((err)=>{
        alert('Sorry there is something wrong with the server')
      })
    }
  }
}
</script>

<style scoped>
  .d-flex {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
}
</style>

