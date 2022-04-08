import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Loading from 'components/loading'

export default class Help extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      help: props.help,
      loading: props.help ? false : true
    }
  }

  componentDidMount() {
    if(!this.state.help)
      fetch('/api/v1/help.html')
        .then((response) => {return response.text()})
        .then((data) => {this.setState({ help: data, loading: false }); this.props.changeHelp(data)})
  }

  render(){
    return(
      <>
        <h1>Справка по использованию</h1>
        <Loading loading={ this.state.loading }/>
        { ReactHtmlParser(this.state.help) }
      </>
    )      
  }
}