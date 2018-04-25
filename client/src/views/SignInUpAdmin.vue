<template>
  <div class="container">
      <h1>Admin</h1>
      <br>
      <div class="row">
        <div class="col-md-6" id="loginCol">
          <h1>Log In</h1>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="emaillogin" v-model="email_login" aria-describedby="emailHelp" placeholder="Enter email" value="">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="passwordlogin" v-model="password_login" placeholder="Enter Password" value="">
          </div>
          <button class="btn btn-primary" v-on:click="login">Login</button>
        </div>

        <div class="col-md-6" id="registerCol">
          <h1>Register</h1>
            <div class="form-group">
              <label>Name</label>
              <input type="text" class="form-control" id="name" v-model="name" placeholder="Enter Full Name" value="">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="email" v-model="email_register" aria-describedby="emailHelp" placeholder="Enter email" value="">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label><span v-if="password_confirm !== password_register" style="color:red; "> insert the same password below</span>
              <input type="password" class="form-control" id="password" v-model="password_register" placeholder="Enter Password" value="">
              <br>
              <input type="password" class="form-control" id="confirmPassword" v-model="password_confirm" placeholder="Enter Password Again" value="">
            </div>

            <button class="btn btn-primary" v-on:click="register">Register</button>
        </div>
      </div>  
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'sign',
    data: function(){
      return {
        name:'',
        email_register:'',
        password_register:'',
        password_confirm:'',
        email_login:'',
        password_login:''
      }      
    },
    methods:{
      register: function(){
        
        axios.post('http://localhost:3000/user/signup',{
          name: this.name,
          email: this.email_register,
          password: this.password_register,
          role: 'admin'

        })
        .then((res)=>{
          localStorage.setItem('token', res.data.token)
          this.$router.push('/')
          
        })
        .catch((err)=>{
          alert('register failed')
          
        })
      },

      login: function(){

        axios.post('http://localhost:3000/user/signin',{
          email: this.email_login,
          password: this.password_login
        })
        .then((res)=>{
          //console.log(res);
          if(res.data.role !== 'admin'){
            alert('You are an User, please sign in using the user login page')
          }else{
            localStorage.setItem('token',res.data.token)
            this.$router.push('/')
          } 
        })
        .catch((err)=>{
          alert('login failed')
          
        })
      }
    }
}
</script>

<style scoped>
    #registerCol{
        text-align: left;
    }

    #loginCol{
      text-align: left;
    }
</style>
