import React from 'react';

function Header(props) {
  return(
    <header>
      <nav>
        <p onClick={() => props.changePage('search')}>Search</p>
        <p onClick={() => props.changePage('catalogs')}>Catalogs</p>
      </nav>
    </header>
  );
}

export default Header;