const { json, response } = require('express');
const express = require('express')
var bcrypt = require('bcryptjs');
var cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin =require('./controllers/signin');
const img = require('./controllers/img');
const profile = require('./controllers/profile')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '12345',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(cors());
app.use(express.json());
app.listen(3000,()=>{
    console.log("Server is up on port 3000");
})

app.get('/',(req,res)=>{
})

app.post('/signin',(req,res)=>{signin.handleSignIn(req,res,db,bcrypt)});

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)});

app.put('/img',(req,res)=>{img.handleImg(req,res,db)});
app.post('/imageurl',(req,res)=>{img.handleFaceDetectCall(req,res)});
app.post('/celeburl',(req,res)=>{img.handleCelebDetectCall(req,res)});


