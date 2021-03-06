import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import swal from 'sweetalert';

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
    if(this.state.location.length > 0 && this.state.term.length > 0) {
      let options = {
        location: this.state.location,
        term: this.state.term
      }
      
      let qs = querystring.stringify(options)
      let url = `/api/search?${qs}`
  
      let businesses = await axios.get(url);
  
      this.props.setBusinesses(businesses.data.businesses);
      this.props.changePage('results');
    } else {
      swal('Error', `You must input a term and location`, 'error');
    }
  }

  render() {
    return(
      <div className="search-wrap">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            name="term"
            placeholder="Term"/>
          <input
            onChange={this.handleChange}
            name="location"
            placeholder="City, Zipcode, etc..."/>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default Search;