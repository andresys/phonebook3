import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {Structure} from 'components/structure'
import Loading from 'components/loading'
import Search from 'components/search'

var current_department_id;
export default class Phonebook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: props.contacts ? props.contacts : [],
      loading: props.contacts ? false : true,
      user_signed: props.user_signed ? props.user_signed : false,
    };
  }

  componentDidMount() {
    if(this.state.contacts.length == 0)
      fetch('/api/v1/contacts.json')
        .then((response) => {return response.json()})
        .then((data) => {
          this.setState({
            loading: false,
            contacts: data //.slice(0, 10)
          })
          //setTimeout(() => {this.setState({contacts: this.state.contacts.concat(data.slice(11))})}, 500)
        });
  }

  render() {
    current_department_id = null;
    return (
      <>
        <Loading loading={ this.state.loading }/>
        <Structure key="structure" contacts={ this.state.contacts } user_signed={this.state.user_signed} />
      </>
    );
  }
};