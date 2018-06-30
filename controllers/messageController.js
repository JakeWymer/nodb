const keys = require('../config/dev');

const accountSid = keys.twilioId;
const authToken = keys.twilioKey;
const client = require('twilio')(accountSid, authToken);

module.exports = {
  send: (req, res) => {
    let businesses = req.body.catalog.businesses.map(e => {
      return e.url;
    });

    businesses = businesses.join(" \n ");

    client.messages
      .create({
        body: businesses,
        from: '+18173187583',
        to: req.body.phoneNumber
      })
      .then(message => console.log(message.sid))
      .done();
  }
}