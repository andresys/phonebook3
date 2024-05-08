import { Controller } from "@hotwired/stimulus"
const axios = require('axios')

export default class extends Controller {
  static targets = ["entries", "pagination"]

  initialize() {
    let options = {
      rootMargin: '200px'
    }

    this.intersectionObserver = new IntersectionObserver(entries => this.processIntersectionEntries(entries), options)
  }

  connect() {
    this.intersectionObserver.observe(this.paginationTarget)
  }

  disconnect() {
    this.intersectionObserver.unobserve(this.paginationTarget)
  }

  processIntersectionEntries(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadMore()
      }
    })
  }

  loadMore() {
    let next_page = this.paginationTarget.querySelector("a[rel='next']")
    if (next_page == null) { return }
    
    let url = next_page.href

    axios.get(url, { headers: { 'Accept': 'application/json' } }).then((response) => {
      this.entriesTarget.insertAdjacentHTML('beforeend', response.data.entries)
      this.paginationTarget.innerHTML = response.data.pagination
    })
  }
}
