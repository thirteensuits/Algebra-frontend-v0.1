import React from "react";
import { NavLink } from "react-router-dom";
import { Provider } from "react-redux";
import store4 from "../redux/store";
import Login from '../functions/Login'
import img from './images/algebra_logo.png';
import { NavHashLink as Link } from 'react-router-hash-link';




function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-light" style={{backgroundColor: "#ebecf0"}}>
        <div className="container navbar_header">
          <NavLink className="navbar-brand" to="/">
          <img src={img} width="150px" />
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to='/'>Home</Link>
              </li>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <li className="nav-item">
              <Provider store={store4}>
              <Login />
              </Provider>
            </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;