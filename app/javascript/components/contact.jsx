import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

function contact_params(params, contact_id, type) {
  var ret_params = []
  if(params)
    params.forEach((param, index) => {
      ret_params.push(
        <div key={'contact_'+contact_id+'_'+type+'_'+index}>
          <small className="d-flex justify-content-between flex-wrap">
            <span className="mr-2 text-nowrap">{param.type}:</span>
            <a className="text-nowrap flex-fill text-right" href={param.link} title={param.hint}>{param.value}</a>
          </small>
        </div>
      )
    })
  return ret_params
}

function favorite(user_signed, value) {
  user_signed = true
  if(user_signed) 
    return (
      <div className="pl-0 pl-sm-5 position-relative">
        <div className="btn-group-toggle position-absolute" data-toggle="checkbox" style={{left: 0}}>
          <label>
            <input type="checkbox" defaultChecked={value} className="star" autoComplete="off" data-url="toggle_profile_favorite_path(contact)" data-remote="true" data-method="post" />
            <h4 className="p-2 m-0 text-muted"></h4>
          </label>
        </div>
      </div>
    )
}

export default class Contact extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    if(this.props.contact.params.phone)
      var phones = (<div className="mr-1">
        <small className="text-nowrap">
          <span className="fa fa-phone"></span>
          <span className="font-weight-bold ml-1">Телефон для связи:</span>
        </small>
        {contact_params(this.props.contact.params.phone, this.props.contact.id, 'phone')}
      </div>)
    if(this.props.contact.params.email)
      var emails = (<div className="ml-1">
        <small className="text-nowrap">
          <span className="fa fa-at"></span>
          <span className="font-weight-bold ml-1">Электронная почта:</span>
        </small>
        {contact_params(this.props.contact.params.email, this.props.contact.id, 'email')}
      </div>)

    return(
      <div className="m-2 p-3 shadow-sm bg-white rounded d-flex flex-fill flex-row align-self-stretch">
        <>{favorite(this.props.user_signed, this.props.contact.favorite ? this.props.contact.favorite : false)}</>
        <div className="d-flex flex-column flex-fill">
          <div className="d-flex flex-column flex-sm-row">
            <div className="align-self-top text-center pt-2">
              <img src={this.props.contact.photo} alt="Contact Photo" className="detail-hide img-thumbnail rounded" style={{minWidth: "70px"}}/>
            </div>
            <div className="p-2 flex-fill">
              <h6 className="text-center text-sm-left detail-hide">{this.props.contact.name}</h6>
              <small className="detail-hide">
                <p className="text-center text-sm-left m-0">{this.props.contact.title}</p>
                <p className="text-center text-sm-left m-0">{this.props.contact.department.name}</p>
              </small>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-around justify-content-sm-between text-muted detail-hide">
            {phones}
            {emails}
          </div>
        </div>
      </div>
    )      
  }
}