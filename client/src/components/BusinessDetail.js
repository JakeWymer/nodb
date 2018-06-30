import React, {Component} from 'react';
import axios from 'axios';

class BusinessDetail extends Component {
  constructor() {
    super();

    this.state = {
      reviews: [],
      catalogSelection: 0,
      catalogs: []
    }

    this.fetchReviews = this.fetchReviews.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.selectedBusiness.id){
      this.fetchReviews();
    }
    this.fetchCatalogs()
  }

  componentDidUpdate(prevProps) {
    if(this.props.selectedBusiness !== prevProps.selectedBusiness) {
      this.fetchReviews();
    }
  }

  handleSelect(e) {
    this.setState({catalogSelection: e.target.value});
  }

  async fetchCatalogs() {
    let catalogs = await axios.get('/api/catalogs');
    let selection = null;
    if(catalogs.data[0]) {
      selection = catalogs.data[0].id
    }
    this.setState({catalogs: catalogs.data, catalogSelection: selection});
  }

  async fetchReviews() {
    let reviews = await axios.get(`/api/reviews/${this.props.selectedBusiness.id}`);
    let revs = reviews.data.reviews.map((e, i) => {
      return <p key={i}>{e.text}</p>
    });

    this.setState({reviews: revs});
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.put(`/api/catalogs/${this.state.catalogSelection}/add`, {business: this.props.selectedBusiness});
  }

  render() {
    let cats = this.state.catalogs.map((e, i) => {
      return <option value={e.id} key={i}>{e.name}</option>
    });

    return(
      <div className="business-detail-wrap">
        <p>{this.props.selectedBusiness.name}</p>
        {this.state.reviews}
        <form onSubmit={this.handleSubmit}>
          <select onChange={this.handleSelect}>
            {cats}
          </select>
          <button>Add to Catalog</button>
        </form>
      </div>
    );
  }    
}

export default BusinessDetail;