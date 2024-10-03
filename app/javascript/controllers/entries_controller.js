import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { query: String, src: String }

  connect() {
    // this.element.addEventListener('turbo:before-fetch-response', this.loadingState.bind(this, false))
    // document.addEventListener("turbo:before-render", (e) => {
    //   this.element.innerHTML = e.detail.newBody
    // })
  }

  disconnect() {
    // this.element.removeEventListener('turbo:frame-load', this.loadingState.bind(this, false))
  }

  queryValueChanged() {
    const [path, paramString ] = this.srcValue.split( '?' )
    let params = new URLSearchParams( paramString )
    if(!params.get('q') && !this.queryValue) { return }
    // this.loadingState(true)
    params.set('q', this.queryValue)
    this.element.src = this.srcValue = `${path}?${params.toString()}`
  }

  loadingState(state) {
    if(state) {
      this.element.classList.add('loading')
    } else {
      this.element.innerHTML = ""
      this.element.classList.remove('loading')
    }
  }
}
