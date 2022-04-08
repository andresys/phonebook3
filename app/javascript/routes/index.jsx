import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Phonebook from "components/phonebook";
import Help from "components/help";
import Login from "components/login";

export default class Routes extends React.Component{

  constructor(props){
    super(props);

    this.state = {}

    this.handleChangeHelp = this.handleChangeHelp.bind(this)
    this.handleChangeContacts = this.handleChangeContacts.bind(this)
  }

  handleChangeHelp(help) {
    this.setState({help: help})
  }

  handleChangeContacts(contacts) {
    this.setState({contacts: contacts})
  }

  render(){
    return(
      <Switch onChange={() => window.scrollTo(0, 0)}>
        <Route path="/react" exact component={() => <Phonebook contacts={this.state.contacts} changeContacts={this.handleChangeContacts}/>} />
        <Route path="/react/help" exact component={() => <Help help={this.state.help} changeHelp={this.handleChangeHelp}/>} />
        <Route path="/react/login" exact component={Login} />
      </Switch>
    )
  }
}