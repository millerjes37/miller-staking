import React from 'react';
import { Link } from 'react-router-dom';
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import './Header.css';

function Header() {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">Miller Staking</Link>
        {isAuthenticated && (
          <ul className="nav-links">
            <li><Link to="/horses">Horses</Link></li>
            <li><Link to="/races">Races</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;