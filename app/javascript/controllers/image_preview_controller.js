import {Controller} from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['input', 'image']
  static outlets = ['crop']

  connect() {
    this.inputTarget.addEventListener('input', () => this.readURL())
  }

  readURL() {
    var input = this.inputTarget

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = () => {
       this.imageTarget.src = reader.result
       this.cropOutlet.load()
     }

     reader.readAsDataURL(input.files[0])
    }
  }
}
