import React from 'react';

function Header(props) {
  return(
    <header>
      <p onClick={() => props.changePage('search')}>Search</p>
      <p onClick={() => props.changePage('catalogs')}>Catalogs</p>
    </header>
  );
}

export default Header;