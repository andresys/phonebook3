import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { url: String }

  initialize() {
    let options = { rootMargin: '500px' }
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadMore()
        }
      })
    }, options)
  }

  connect() {
    this.observer.observe(this.element)
  }

  disconnect() {
    this.observer.unobserve(this.element)
  }

  loadMore() {
    this.element.remove()
    if(this.hasUrlValue) {
      fetch(this.urlValue, { headers: { Accept: "text/vnd.turbo-stream.html" } })
        .then(response => response.text())
        .then(text => Turbo.renderStreamMessage(text))
    }
  }
}
