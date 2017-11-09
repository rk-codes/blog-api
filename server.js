const express = require('express');
const morgan = require('morgan');
const blogPostsRouter = require('./blogPostsRouter');

const {BlogPosts} = require('./models');

const app = express();
app.use(morgan('common'));

const content = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`

BlogPosts.create('Around the world', content, 'RK');
BlogPosts.create('Im on my way', content, 'VS');

app.use('/blog-posts', blogPostsRouter)

app.use('*', (req, res, next) => {
	res.status(404).send('Not Found')
})

app.use((err, req, res, next) => {
	if (res.headersSent) {
		return next(err)
	}
	res.status(500).send(`${err.name}: ${err.message}`)
})

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
