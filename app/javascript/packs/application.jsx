import React from 'react'
import ReactDOM from 'react-dom'
import Phonebook from 'components/phonebook'

document.addEventListener('turbolinks:load', () => {
  [Phonebook]
    .forEach((Component) => {
      const mountNode = document.getElementById(Component.name);
      if (mountNode == null) { return; }
      const propsJSON = mountNode.getAttribute('data-react-props');
      const props = JSON.parse(propsJSON);

      ReactDOM.render(<Component {...props} />, mountNode);
    });
})