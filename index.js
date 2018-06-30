const Express = require('express');
const bodyParser = require('body-parser');
const app = Express();
const PORT = 5000;

const yelpCtrl = require('./controllers/yelpController');
const catCtrl = require('./controllers/catalogController');
const msgCtrl = require('./controllers/messageController');

app.use(bodyParser.json());

app.get('/api/search' , yelpCtrl.search);
app.get('/api/reviews/:id', yelpCtrl.reviews);

app.get('/api/catalogs', catCtrl.read);
app.post('/api/catalogs', catCtrl.create);
app.put('/api/catalogs/:id/add', catCtrl.add);
app.put('/api/catalogs/:id/rename', catCtrl.rename);
app.delete('/api/catalogs/:id', catCtrl.delete);
app.delete('/api/catalogs/:catalogId/:businessId', catCtrl.deleteBus);

app.post('/api/text', msgCtrl.send);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});