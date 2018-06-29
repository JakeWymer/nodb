import React, {Component} from 'react';
import axios from 'axios';

class BusinessDetail extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      reviews: []
    }

    this.fetchReviews = this.fetchReviews.bind(this);
  }

  componentDidMount() {
    console.log(this.props.selectedBusiness)
    if(this.props.selectedBusiness.id){
      this.fetchReviews();
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.selectedBusiness !== prevProps.selectedBusiness) {
      this.fetchReviews();
    }
  }

  async fetchReviews() {
    let reviews = await axios.get(`/api/reviews/${this.props.selectedBusiness.id}`);
    let revs = reviews.data.reviews.map((e, i) => {
      return <p key={i}>{e.text}</p>
    });

    console.log(revs);

    this.setState({reviews: revs, loading: false});
  }

  render() {
    return(
      <div className="business-detail-wrap">
        <p>{this.props.selectedBusiness.name}</p>
        {this.state.reviews}
      </div>
    );
  }    
}

export default BusinessDetail;