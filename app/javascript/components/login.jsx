import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class Login extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <>
        <div className="mb-3 nav d-lg-none d-flex flex-row justify-content-center">
          <a className="nav-link active" href="#login" data-toggle="tab">
            <h2 className="m-0">Вход</h2>
          </a>
          <a className="nav-link" href="#login" data-toggle="tab">
            <h2 className="m-0">Регистрация</h2>
          </a>
        </div>
        <div className="tab-content row">
          <div id="login" className="tab-pane fade show active col-lg-6 text-center"></div>
          <div id="registration" className="tab-pane fade col-lg-6 text-center"></div>
        </div>
      </>
    )      
  }
}