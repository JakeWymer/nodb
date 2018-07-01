import React from 'react';

function CatalogListItem(props) {
  return(
    <div className="catalog-list-item">
      <div className="info-wrap">
        <h4
          onClick={() => props.selectCatalog(props.catalog)}>
            {props.catalog.name}
        </h4>
        <h5>Catalog Length: {props.catalog.businesses.length}</h5>
      </div>
      <i 
        className="fas fa-times"
        onClick={() => props.deleteCatalog(props.catalog)}></i>
    </div>
  ); 
}

export default CatalogListItem;