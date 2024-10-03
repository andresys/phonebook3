import { Controller } from "@hotwired/stimulus"
import { Turbo } from "@hotwired/turbo-rails"

export default class extends Controller {
  static values = { url: String }

  connect() {
    this.element.addEventListener('click', this.clickContact.bind(this))
  }

  clickContact(_) {
    Turbo.visit(this.urlValue)
  }
}
