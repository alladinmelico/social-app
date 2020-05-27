const functions = require('firebase-functions')

const express = require('express')
const app = express()

const { getAllPosts, postOne } = require('./handlers/posts')
const { signup, login } = require('./handlers/users')

const FBAuth = require('./util/fbAuth')

//post routes
app.get('/posts', getAllPosts)
app.post('/post', FBAuth, postOne)

//users
let token, userId
app.post('/signup', signup)
app.post('/login', login)

exports.api = functions.region('asia-east2').https.onRequest(app)
