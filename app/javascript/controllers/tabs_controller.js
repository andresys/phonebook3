import {Controller} from "@hotwired/stimulus"

export default class extends Controller {
  static classes = ['active', 'default']
  static values = {
    selectedTab: String,
    activeClass: { type: String, default: 'active' }
  }

  connect() {
    const matches = this.element.querySelectorAll("[data-action*='tabs#']")
    this.tabs = {}
    matches.forEach(el => {
      const action = el.dataset.action.split('#')[1]
      if(this.tabs.length == 0 && this.selectedTabValue == '') { this.selectedTabValue = action }
      this.tabs[action] = [el, this.element.querySelector(`#${action}`)]
      this.constructor.prototype[action] = e => {
        e.stopPropagation()
        this.selectedTabValue = action
      }
    })

    if(!this.hasSelectedTabValue) { this.selectedTabValue = matches[0].dataset.action.split('#')[1] }
    this.selectedTabValueChanged(this.selectedTabValue)
  }
  
  selectedTabValueChanged(selectedTab) {
    Object.keys(this.tabs || []).forEach(t => {
      const [tab, pane] = this.tabs[t]
      if (selectedTab == t) {
        pane.style.display = ''
        tab.classList.add(this.activeClassValue)
        if(this.hasActiveClass) {
          tab.classList.add(...this.activeClasses)
        }
      } else {
        pane.style.display = 'none'
        tab.classList.remove(this.activeClassValue)
        if(this.hasActiveClass) {
          tab.classList.remove(...this.activeClasses)
        }
      }
    })
  }  
}
