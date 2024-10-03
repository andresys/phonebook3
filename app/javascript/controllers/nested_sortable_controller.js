import { Controller } from "@hotwired/stimulus"
import { Sortable } from "sortablejs"
import { patch } from "@rails/request.js"

export default class extends Controller {
  static values = {
    resourceName: String,
    paramName: {
      type: String,
      default: "position",
    },
    responseKind: {
      type: String,
      default: "html",
    },
    animation: Number,
    handle: String,
  }

  initialize() {
    this.onUpdate = this.onUpdate.bind(this)
  }

  connect() {
    let nestedSortables = this.element.querySelectorAll("ul")
    this.sortables = []

    for (var i = 0; i < nestedSortables.length; i++) {
      this.sortables << new Sortable(nestedSortables[i], {
        ...this.defaultOptions,
        ...this.options,
      })
    }
  }

  disconnect() {
    for (var i = 0; i < this.sortables.length; i++) {
      this.sortable[i].destroy()
      this.sortable[i] = undefined
    }
  }

  async onUpdate({ item, newIndex }) {
    if (!item.dataset.sortableUpdateUrl) return

    const param = this.resourceNameValue ? `${this.resourceNameValue}[${this.paramNameValue}]` : this.paramNameValue

    const data = new FormData()
    data.append(param, newIndex + 1)

    return await patch(item.dataset.sortableUpdateUrl, { body: data, responseKind: this.responseKindValue })
  }

  get options() {
    return {
      animation: this.animationValue || this.defaultOptions.animation || 150,
      handle: this.handleValue || this.defaultOptions.handle || undefined,
      onUpdate: this.onUpdate,
    }
  }

  get defaultOptions() {
    return {
      group: 'nested',
      // fallbackOnBody: true,
      ghostClass: 'place'
      // swapThreshold: 1,
      // invertSwap: true,
      // swapThreshold: 0.65,
    }
  }
}