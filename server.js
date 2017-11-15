const express = require('express');
const morgan = require('morgan');
const blogPostsRouter = require('./blogPostsRouter');

const {BlogPosts} = require('./models');

const app = express();
app.use(morgan('common'));

const content = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`

BlogPosts.create('Around the world', content, 'RK');
BlogPosts.create('Im on my way', content, 'VS');

app.use('/blog-posts', blogPostsRouter);

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    })
    .on('error', err => {
      reject(err);
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};

/*
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
*/
