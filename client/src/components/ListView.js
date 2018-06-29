import React from 'react';
import ResultsListItem from './ResultsListItem';

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
    //RETURN CATALOG LIST ITEM
  });

  return(
    <div className="list-view-wrap">
      {data}
    </div>
  );
}

export default ListView;