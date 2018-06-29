import React, { Component } from 'react';
import ListView from './ListView';
import BusinessDetail from './BusinessDetail';

class Results extends Component {
  constructor() {
    super();

    this.state = {
      selectedBusiness: {}
    }

    this.setSelectedBusiness = this.setSelectedBusiness.bind(this);
  }

  setSelectedBusiness(business) {
    this.setState({selectedBusiness: business});
  }

  render() {
    return(
      <div className="results-wrap">
        <h2>RESULTS PAGE</h2>
        <ListView 
          data={this.props.businesses}
          type="business"
          setSelectedBusiness={this.setSelectedBusiness}/>
        
        <BusinessDetail 
          selectedBusiness={this.state.selectedBusiness}/>
      </div>
    );
  }
}

export default Results;