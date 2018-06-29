const querystring = require('querystring');
const keys = require('../config/dev');
const axios = require('axios');

module.exports = {
   search: async (req, res) => {
    const uri = 'https://api.yelp.com/v3/businesses/search';

    let config = {
      headers: {
        Authorization: `Bearer ${keys.yelpKey}`
      }
    }

    let options = {
      location: req.query.location,
      term: req.query.term
    }
    
    let qs = querystring.stringify(options)
    let url = `${uri}?${qs}`;

    let data = await axios.get(url, config);

    res.send(data.data);
  },
  reviews: async (req, res) => {
    console.log(req.params.id);
    let config = {
      headers: {
        Authorization: `Bearer ${keys.yelpKey}`
      }
    }

    let url = ` https://api.yelp.com/v3/businesses/${req.params.id}/reviews`

    let data = await axios.get(url, config);

    res.send(data.data);
  } 
}