import {Controller} from "@hotwired/stimulus"
import Cropper from 'cropperjs'

export default class extends Controller {
  static values = { active: Boolean }
  static targets = ['image', 'crop_x', 'crop_y', 'crop_w', 'crop_h']

  connect() {
    let that = this
    this.options = {
      viewMode: 3,
      dragMode: 'move',
      autoCropArea: 1,
      restore: false,
      modal: false,
      guides: false,
      center: false,
      highlight: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      toggleDragModeOnDblclick: false,
      // aspectRatio: 1 / 1,
      crop(e) { that.setCrop(e) }
    }
    if(this.activeValue) this.load()
  }

  load() {
    this.cropper = new Cropper(this.imageTarget, this.options)
  }

  setCrop(e) {
    this.crop_xTarget.value = e.detail.x
    this.crop_yTarget.value = e.detail.y
    this.crop_wTarget.value = e.detail.width
    this.crop_hTarget.value = e.detail.height
  }
}
