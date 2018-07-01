import React, {Component} from 'react';
import axios from 'axios';
import ListView from './ListView';
import CatalogDetail from './CatalogDetail';

class Catalogs extends Component {
  constructor() {
    super();

    this.state = {
      catalogs: [],
      userInput: '',
      selectedCatalog: null
    }

    this.addCatalog = this.addCatalog.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.selectCatalog = this.selectCatalog.bind(this);
    this.deleteCatalog = this.deleteCatalog.bind(this);
    this.editCatalogName = this.editCatalogName.bind(this);
    this.deleteBusFromCat = this.deleteBusFromCat.bind(this);
  }

  async componentDidMount() {
    let catalogs = await axios.get('/api/catalogs');
    this.setState({catalogs: catalogs.data});
  }

  async addCatalog(e) {
    e.preventDefault();
    let res = await axios.post('/api/catalogs', {name: this.state.userInput, businesses: []});
    this.setState({catalogs: res.data, userInput: ''});
  }

  handleInput(e) {
    this.setState({userInput: e.target.value});
  }

  selectCatalog(cat) {
    this.setState({selectedCatalog: cat});
  }

  async deleteCatalog(catalog) {
    let cats = await axios.delete(`/api/catalogs/${catalog.id}`);
    this.setState({selectedCatalog: null, catalogs: cats.data});
  }

  async editCatalogName(catalog, newName) {
    let cats = await axios.put(`/api/catalogs/${catalog.id}/rename`, {name: newName});
    let selectedCat = cats.data.find(e => e.id == catalog.id);
    this.setState({catalogs: cats.data, selectedCatalog: selectedCat});
  }

  async deleteBusFromCat(catalog, business) {
    let cats = await axios.delete(`/api/catalogs/${catalog.id}/${business.id}`, {business});
    let selectedCat = cats.data.find(e => e.id == catalog.id);
    this.setState({catalogs: cats.data, selectedCatalog: selectedCat});
  }

  render() {
    return(
      <div className="catalogs-wrap">
        <div className="catalogs-content">
          <div className="left-panel">
            <form onSubmit={this.addCatalog}>
              <input 
                onChange={this.handleInput} 
                value={this.state.userInput}
                name="catalog-name"/>
              <button>Add Catalog</button>
            </form>
            <ListView
              type="catalog"
              data={this.state.catalogs}
              selectCatalog={this.selectCatalog}
              deleteCatalog={this.deleteCatalog}/>
          </div>
          <CatalogDetail
            selectedCatalog={this.state.selectedCatalog}
            editCatalogName={this.editCatalogName}
            deleteBusFromCat={this.deleteBusFromCat}/>
        </div>
      </div>
    );
  }
}

export default Catalogs;