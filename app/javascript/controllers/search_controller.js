import { Controller } from "@hotwired/stimulus"
import { getQuery } from "../utils/navigation"
import { useHotkeys } from "stimulus-use/hotkeys"

export default class extends Controller {
  static targets = [ "input", "clear" ]

  connect() {
    this.inputTarget.value = getQuery(location.search)
    this.inputTarget.addEventListener('click', () => { this.inputTarget.dispatchEvent(new Event('input')) })
    this.clearTarget.addEventListener('click', () => { 
      this.inputTarget.value = ""
      this.inputTarget.focus()
    })
    this.element.addEventListener('autocomplete.change', () => { this.element.submit() })
    useHotkeys(this, { 'ctrl+f, F3': [(e) => { e.preventDefault(); this.inputTarget.focus() }] })
  }
}
