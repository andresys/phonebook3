import React from "react";
import Routes from "routes/index";
import { BrowserRouter as Router, Link } from "react-router-dom";
import ScrollToTop from 'react-router-scroll-top'
import MainMenu from "components/main_menu"
import AccountMenu from "components/account_menu"

import 'css/style.css';
import 'css/sign.scss';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

export default class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      title: gon.title || ("Телефонный справочник [версия " + gon.version + "]"),
      version: gon.version
    }
  }


  render(){
    document.title = this.state.title

    return(
      <Router>
        <ScrollToTop>
          <header className="navbar navbar-expand-lg sticky-top navbar-dark bg-phonebook">
            <div className="container">
              <Link to="/react" className="navbar-brand" role="button">
                <img src="/assets/icon.png" alt="Phonebook icon"/>
                <span className="d-none d-sm-inline"> Телефонный справочник</span>
              </Link>
              <nav className="d-flex">
                <MainMenu/>
                <AccountMenu/>
              </nav>
            </div>
          </header>
          <div className="container"><Routes/></div>
          <footer className="fixed-bottom border-top">
            <div className="container py-2 d-lg-flex flex-row">
              <p className="m-0 small flex-fill d-none d-lg-block">{this.state.title}</p>
              <p className="m-0 small text-center">© Телефонный справочник, 2013 [версия {this.state.version}]</p>
            </div>
          </footer>
        </ScrollToTop>
      </Router>
    )
  }
}