import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
        <Link to="https://thinktoprod.com" target="_blank" rel="noopener noreferrer">
          <p>thinkToProd</p>
        </Link>
    </div>
  );
}

export default Header;