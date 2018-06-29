import React, { Component } from 'react';
import Search from './Search';
import Results from './Results';

class App extends Component {
  constructor() {
    super();

    this.state = {
      page: 'search',
      businesses: []
    }

    this.renderPage = this.renderPage.bind(this);
    this.changePage = this.changePage.bind(this);
    this.setBusinesses = this.setBusinesses.bind(this);
  }

  setBusinesses(businesses) {
    this.setState({businesses});
  }

  changePage(page) {
    this.setState({page});
  }

  renderPage() {
    switch(this.state.page) {
      case('results'):
        return <Results businesses={this.state.businesses}/>
      default: 
        return <Search 
                changePage={this.changePage}
                setBusinesses={this.setBusinesses}/>
    }
  }

  render() {
    return (
      <div>
        {this.renderPage()}
      </div>
    );
  }
}

export default App;
