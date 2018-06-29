import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      term: '',
      location: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  async handleSubmit(e) {
    e.preventDefault();
    let options = {
      location: this.state.location,
      term: this.state.term
    }
    
    let qs = querystring.stringify(options)
    let url = `/api/search?${qs}`

    let businesses = await axios.get(url);

    this.props.setBusinesses(businesses.data.businesses);
    this.props.changePage('results');
  }

  render() {
    return(
      <div>
        <h2>Search</h2>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} name="term"/>
          <input onChange={this.handleChange} name="location"/>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default Search;