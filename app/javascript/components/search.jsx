import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

function FavoriteButton(props) {
  const isLoggedIn = props.isLoggedIn;

  if (isLoggedIn) {
    return(
      <div className="btn-group-toggle ml-3">
        <label className="label btn btn-lg btn-outline-primary favorite">
          <input type="checkbox" />
          <span className="far fa-star">
            <span className="d-none d-sm-inline">{props.caption}</span>
          </span>
        </label>
      </div>
    )
  }
  return(null);
}

export default class Search extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id="search" className="d-flex flex-row">
        <div className="flex-fill">
          <input className="form-control form-control-lg" placeholder="Быстрый поиск контактов" autoComplete="off" />
        </div>
        <FavoriteButton isLoggedIn={true} caption="Избранное"/>
      </div>
    )      
  }
}