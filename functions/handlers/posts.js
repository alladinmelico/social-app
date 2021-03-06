const { db } = require('../util/admin')

exports.getAllPosts = (req, res) => {
	db.collection('posts')
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let posts = []
			data.forEach((doc) => {
				posts.push({ ...doc.data() })
			})
			return res.json(posts)
		})
		.catch((err) => console.error(err))
}

exports.postOne = (req, res) => {
	const newPost = {
		body: req.body.body,
		userHandle: req.user.handle,
		createdAt: new Date().toISOString(),
	}

	return db
		.collection('posts')
		.add(newPost)
		.then((doc) =>
			res.json({
				message: `document ${doc.id} created successfully`,
			})
		)
		.catch((err) => {
			res.status(500).json({ error: 'something went wrong' })
			console.error(err)
		})
}

exports.getPost = (req, res) => {
	let postData = {}
	console.log(req.params)
	db.doc(`/posts/${req.params.id}`)
		.get()
		.then((doc) => {
			if (!doc.exists)
				return res.status(400).json({ error: 'Post not found' })
			postData = doc.data()
			postData.postId = doc.id
			return db
				.collection('comments')
				.where('postId', '==', req.params.id)
				.get()
		})
		.then((data) => {
			postData.comments = []
			data.forEach((doc) => {
				postData.comments.push(doc.data())
			})
			return res.json(postData)
		})
		.catch((err) => {
			console.error(err)
			return res.status(500).json({ error: err.code })
		})
}
