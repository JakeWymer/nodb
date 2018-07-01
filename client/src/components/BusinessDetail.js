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
      return(
        <div className="review-item">
          <p key={i}>{e.text}</p>
        </div>
      );
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

    if(this.props.selectedBusiness.name) {
      return(
        <div className="business-detail-wrap">
          <div className="business-content">
            <img src={this.props.selectedBusiness.image_url} alt=""/>
            <p>{this.props.selectedBusiness.name}</p>
          </div>
          <div className="reviews-wrap">
            {this.state.reviews}
          </div>
          <form onSubmit={this.handleSubmit}>
            <select onChange={this.handleSelect}>
              {cats}
            </select>
            <button>Add to Catalog</button>
          </form>
        </div>
      );
    }

    return(
      <div className="business-detail-wrap">
        <div className="business-content">
          <h2>Select a business</h2>
        </div>
      </div>
    );
  }    
}

export default BusinessDetail;