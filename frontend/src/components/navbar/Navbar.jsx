import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector, logout } from '../../redux/reducers/userReducer';
import './navbar.css';

function Navbar() {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/sign-in');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid" id="navbar">
        <p className="navbar-brand" id="companyConnect">Postify</p>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {user.name}</span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item d-flex align-items-center">
                <Link className="nav-link" to="/sign-up">Sign-up</Link>
                <Link className="nav-link" to="/sign-in">Sign-in</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
