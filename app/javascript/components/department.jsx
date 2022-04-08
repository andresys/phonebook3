import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class Department extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="m-2 p-2 shadow-sm bg-light rounded d-flex flex-fill flex-column align-self-stretch">
        <div className="mx-2 d-lg-flex flex-row">
          <h5 className="h5 m-0 align-self-center flex-fill">{this.props.department.name}</h5>
        </div>
      </div>
    )
  }
}