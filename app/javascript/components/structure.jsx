import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Contact from 'components/contact'
import Department from 'components/department'

export const Structure = (props) => {
  var strucrure = []
  var current_department_id = null;
  props.contacts.forEach((contact) => {
    if (contact.department.id != current_department_id) {
      current_department_id = contact.department.id
      strucrure.push(
        <div key={'department_'+current_department_id} className="col-12 p-0 d-flex">
          <Department department={contact.department}/>
        </div>
      )
    }
    strucrure.push(
      <div key={'contact_'+contact.id} className="col-lg-6 p-0 d-flex">
        <Contact contact={contact} user_signed={props.user_signed} />
      </div>
    )
  })
  return(
    <>{strucrure}</>
  )
}