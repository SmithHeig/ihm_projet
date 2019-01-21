const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());

let lift = null;

app.get('/lifts/', (req, res, next) => {
  console.log(lift);
  if (lift === null){
    res.status(201);
    res.send(null);
  } else {
    res.send(lift);
    lift = null;
  }
});

app.get('/addLift/', (req, res, next) => {
  console.log("lift added")
  lift = {name: "Bob", detour: 5}
  res.send(lift);
});

// Forward 404 to error handler
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error(err);
    res.status(err.status || 500);
    res.send(err.message);
});


app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;