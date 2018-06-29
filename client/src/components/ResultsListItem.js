import React from 'react';

function ResultsListItem(props) {
  return(
    <div 
      className="results-list-item"
      onClick={() => props.setSelectedBusiness(props.business)}>
      <h3>{props.business.name}</h3>
    </div>
  );
}

export default ResultsListItem;