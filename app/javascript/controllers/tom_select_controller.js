import StimulusTomSelect from "stimulus-tom-select"
import Translations from './i18n/select.json'

const i18n = Translations[document.querySelector('body').dataset.lang || 'ru']

export default class extends StimulusTomSelect {
  static values = {
    value: String,
    label: String,
    path: String,
  }

  initTomSelect() {

    this.options = {
      // valueField: this.valueValue,
      labelField: this.labelValue,
      searchField: this.labelValue,
      // load: (query, callback) => {
      //   if (!query.length) return callback();
      //   $.ajax({
      //     url: `${this.pathValue}${encodeURIComponent(query)}`,
      //     type: "GET",
      //     error: () => callback(),
      //     success: (res) => callback(res),
      //   });
      // },
      plugins: {
        'clear_button':{
          'title': i18n['clear_button'],
        }
      },
      render: {
        no_results: (_date, _escape) => {
          return '<div class="no-results">' + i18n['no_results'] + '</div>'
        },
        option_create: function(data, escape) {
          return '<div class="create">' + i18n['add'] + ' <strong>' + escape(data.input) + '</strong>&hellip;</div>'
        },
      },
      ...this.optionsValue,
    }
    super.initTomSelect()
  }
}