import {Controller} from "@hotwired/stimulus"
import Cropper from 'cropperjs'

export default class extends Controller {
  static values = { active: Boolean }
  static targets = ['image', 'plug', 'crop_x', 'crop_y', 'crop_w', 'crop_h']

  connect() {
    this.imageTarget.hidden = this.activeValue
    this.plugTarget.hidden = true //this.activeValue
    let that = this

    let initLeft = parseFloat(this.crop_xTarget.value)
    let initTop = parseFloat(this.crop_yTarget.value)
    let initWidth = parseFloat(this.crop_wTarget.value)
    let initHeight = parseFloat(this.crop_hTarget.value)
    
    this.options = {
      viewMode: 3,
      dragMode: 'move',
      autoCropArea: 1,
      modal: false,
      guides: false,
      center: false,
      highlight: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      toggleDragModeOnDblclick: false,
      aspectRatio: 1 / 1,
      ready() {
        let canvas = this.cropper.getCanvasData()
        let sx = initWidth / canvas.width
        let sy = initHeight / canvas.height
        this.cropper.setCanvasData({
          left: -initLeft / sx, 
          top: -initTop / sy, 
          width: canvas.naturalWidth / sx, 
          height: canvas.naturalHeight / sy
        })
      },
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
