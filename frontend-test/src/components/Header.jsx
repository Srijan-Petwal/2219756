import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">URL Shortener</h1>
        <nav className="nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Shorten URLs
          </Link>
          <Link 
            to="/stats" 
            className={`nav-link ${location.pathname === '/stats' ? 'active' : ''}`}
          >
            Statistics
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;