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
      location: '76137',
      term: 'food'
    }
    
    let qs = querystring.stringify(options)
    let url = `${uri}?${qs}`;
    let data = await axios.get(url, config);
   
    res.send(data.data);
  }
}