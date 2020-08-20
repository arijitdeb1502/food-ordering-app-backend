const app = require('./app');
const port = process.env.PORT;

//docker run command : docker run -p 3000:3001 arijithere/food-ordering-app-backend
//docker compose run command : docker-compose up
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// error handler middleware
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({
      status: 500,
      error: err.message,
      body: {}
    });
  })