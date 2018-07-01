import React from 'react';

function ResultsListItem(props) {
  return(
    <div 
      className="results-list-item"
      onClick={() => props.setSelectedBusiness(props.business)}>
      <img src={props.business.image_url} alt=""/>
      <h3>{props.business.name}</h3>
    </div>
  );
}

export default ResultsListItem;