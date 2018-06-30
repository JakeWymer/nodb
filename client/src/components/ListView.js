import React from 'react';
import ResultsListItem from './ResultsListItem';
import CatalogListItem from './CatalogListItem';

function ListView(props) {
  let data = props.data.map((e, i) => {
    if(props.type === 'business') {
      return(
        <ResultsListItem 
          business={e} 
          key={i}
          setSelectedBusiness={props.setSelectedBusiness}/>
      );
    }
    return <CatalogListItem
            catalog={e}
            key={i}
            selectCatalog={props.selectCatalog}
            deleteCatalog={props.deleteCatalog}/>
  });

  return(
    <div className="list-view-wrap">
      {data}
    </div>
  );
}

export default ListView;