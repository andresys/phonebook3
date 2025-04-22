import {Controller} from "@hotwired/stimulus"

export default class extends Controller {
  static values = { disable: Boolean }
  static targets = ['input', 'image']
  static outlets = ['crop']

  connect() {
    this.inputTarget.addEventListener('input', () => this.readURL())
    this.inputTarget.addEventListener('click', (e) => { if(this.disableValue) e.preventDefault() })
  }

  readURL() {
    var input = this.inputTarget

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = () => {
       this.imageTarget.src = reader.result
       this.cropOutlet.load()
       this.disableValue = true
     }

     reader.readAsDataURL(input.files[0])
    }
  }
}
