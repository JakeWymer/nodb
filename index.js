const Express = require('express');
const bodyParser = require('body-parser');
const app = Express();
const PORT = 5000;

const yelpCtrl = require('./controllers/yelpController');

app.use(bodyParser.json());

app.get('/api/search' , yelpCtrl.search);
app.get('/api/reviews/:id', yelpCtrl.reviews);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});