import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    url: String,
    query: String
  }

  connect() {
    fetch(this.urlValue, {
      headers: {
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
        "Accept": "text/vnd.turbo-stream.html"
      }
    })
    .then(response => response.text())
    .then(text => Turbo.renderStreamMessage(text))
  }

  queryValueChanged() {
    console.log(this.queryValue)
  }
}
