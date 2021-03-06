import React, {Component} from 'react';
import TextModal from './TextModal';
import axios from 'axios';

class CatalogDetail extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
      userInput: '',
      sending: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSendClick = this.handleSendClick.bind(this);
    this.sendText = this.sendText.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(e) {
    this.setState({userInput: e.target.value});
  }

  handleClick() {
    if(this.props.selectedCatalog) {
      this.setState({editing: true, userInput: this.props.selectedCatalog.name});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.editCatalogName(this.props.selectedCatalog, this.state.userInput);
    this.setState({editing: false, userInput: ''});
  }

  handleSendClick() {
    this.setState({sending: true});
  }

  sendText(phone) {
    let cat = this.props.selectedCatalog;
    axios.post('/api/text', {catalog: cat, phoneNumber: phone});
    this.setState({sending: false});
  }

  handleCancel() {
    this.setState({sending: false});
  }

  render() {
    let businesses = [];
    let headline = 'Select a catalog';
    let shareDisplayClass = 'hide';

    if(this.props.selectedCatalog) {
      if(this.props.selectedCatalog.businesses.length > 0) {
        shareDisplayClass = 'show';
      }
      headline = this.props.selectedCatalog.name;
      businesses = this.props.selectedCatalog.businesses.map((e, i) => {
        return(
          <div key={i} className="catalog-business-wrap">
            <img src={e.image_url} alt={e.name}/>
            <p>{e.name}</p>
            <i 
              className="fas fa-times"
              onClick={() => this.props.deleteBusFromCat(this.props.selectedCatalog, e)}></i>
          </div>
        );  
      });
    }

    if(this.state.editing) {
      return(
        <div className="catalog-detail-wrap">
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.userInput} onChange={this.handleChange}/>
          </form>
          {businesses}
        </div>
      );
    }

    return(
      <div className="catalog-detail-wrap">
        <TextModal
          sending={this.state.sending}
          sendText={this.sendText}
          handleCancel={this.handleCancel}/>
        <div className="catalog-title">
          <h1 onClick={this.handleClick}>{headline}</h1>
          <i 
            className={`fas fa-share-square ${shareDisplayClass}`}
            onClick={this.handleSendClick}></i>
        </div>
        {businesses}
      </div>
    );
  }
}

export default CatalogDetail;