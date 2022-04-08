import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { NavLink } from "react-router-dom";

export default class MainMenu extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    const isActive = (path, match, location) => !!(path === location.pathname);

    return(
      <nav className="d-flex">
        <ul className="navbar-nav flex-row ml-auto">
          <li className="nav-item">
            <NavLink to="/react" className="nav-link mr-2 mr-lg-0" role="button" isActive={isActive.bind(this, '/react')}>
              <i className="fas fa-address-book mr-1"></i> <span className="d-none d-lg-inline">Контакты</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/react/help" className="nav-link mr-2 mr-lg-0" role="button">
              <i className="fas fa-question-circle mr-1"></i> <span className="d-none d-lg-inline">Справка</span>
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/react/login" className="nav-link dropdown" role="button">
              <span className="fas fa-sign-in-alt mr-1"></span><span className="d-none d-lg-inline">Вход в систему</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    )      
  }
}