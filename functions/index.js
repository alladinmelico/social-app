const functions = require('firebase-functions')

const express = require('express')
const app = express()

const { getAllPosts, postOne, getPost } = require('./handlers/posts')
const {
	signup,
	login,
	uploadImage,
	addUserDetails,
	getAuthenticatedUser,
} = require('./handlers/users')

const FBAuth = require('./util/fbAuth')

//post routes
app.get('/posts', getAllPosts)
app.post('/post', FBAuth, postOne)
app.get('/post/:id', getPost)

//users
let token, userId
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/users', FBAuth, getAuthenticatedUser)

exports.api = functions.region('asia-east2').https.onRequest(app)
