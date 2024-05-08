import Dropdown from '@stimulus-components/dropdown'

export default class extends Dropdown {
  connect() {
    super.connect()
  }

  toggle(event) {
    super.toggle()
    event.preventDefault()
  }

  hide(event) {
    super.hide(event)
  }
}