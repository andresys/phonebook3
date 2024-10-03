module Settings
  SETTINGS = {
    index: { max_ngram_diff: 50 },
    analysis: {
      filter: {
        autocomplete_filter: {
          type: 'edge_ngram',
          min_gram: 1,
          max_gram: 20
        },
        search_filter: {
          type: 'ngram',
          min_gram: 1,
          max_gram: 20
        },
        abbr_filter: {
          type: 'pattern_replace',
          pattern: '((([A-zА-я0-9])[A-zА-я0-9]+)([^A-zА-я0-9]+!?)|[A-zА-я0-9]+[^A-zА-я0-9]+!?)', #'(((\S)\S+)( ?)|(\S+ ?))',
          replacement: '$3',
        },
        phone_filter: {
          type: 'pattern_capture',
          patterns: [
            '\+\d[\d \-()]+',
            '\([\d \-()]+',
            '(^|[: ]+)[\d \-()]+([ \-,]|$)'
          ]
        },
        phoneclean_filter: {
          type: 'pattern_replace',
          pattern: '[()\- +]',
          replacement: '',
        },
        email_filter: {
          type: "pattern_capture",
          preserve_original: true,
          patterns: [
            '([^@]+)',
            # '(\p{L}+)',
            '(\d+)',
            '@(.+)'
          ]
        }
      },
      char_filter: {
        rus_en_key_filter: {
          type: 'mapping',
          mappings: [
            'a => ф',
            'b => и',
            'c => с',
            'd => в',
            'e => у',
            'f => а',
            'g => п',
            'h => р',
            'i => ш',
            'j => о',
            'k => л',
            'l => д',
            'm => ь',
            'n => т',
            'o => щ',
            'p => з',
            'q => й',
            'r => к',
            's => ы',
            't => е',
            'u => г',
            'v => м',
            'w => ц',
            'x => ч',
            'y => н',
            'z => я',
            '` => ё',
            '[ => х',
            '] => ъ',
            ', => б',
            '. => ю',
            '; => ж',
            '\' => э',

            'A => ф',
            'B => и',
            'C => с',
            'D => в',
            'E => у',
            'F => а',
            'G => п',
            'H => р',
            'I => ш',
            'J => о',
            'K => л',
            'L => д',
            'M => ь',
            'N => т',
            'O => щ',
            'P => з',
            'Q => й',
            'R => к',
            'S => ы',
            'T => е',
            'U => г',
            'V => м',
            'W => ц',
            'X => ч',
            'Y => н',
            'Z => я',
            '~ => ё',
            '{ => х',
            '} => ъ',
            '< => б',
            '> => ю',
            ': => ж',
            '" => э',
          ]
        },
        yo_filter: {
          type: 'mapping',
          mappings: [
              'ё => е',
              'Ё => Е'
          ]
        }
      },
      analyzer: {
        text_analyzer: { 
          type: 'custom',
          char_filter: [ 'yo_filter' ],
          tokenizer: 'standard',
          filter: [ 'lowercase', 'asciifolding', 'autocomplete_filter' ]
        },
        search_text_analyzer: {
          type: 'custom',
          char_filter: [ 'yo_filter', 'rus_en_key_filter' ],
          tokenizer: 'standard',
          filter: [ 'lowercase', 'asciifolding' ]
        },
        abbr_analyzer: { 
          type: 'custom',
          tokenizer: 'keyword',
          filter: [ 'lowercase', 'asciifolding', 'abbr_filter', 'autocomplete_filter' ]
        },
        keyword_analyzer: {
          type: 'custom',
          tokenizer: 'keyword',
          filter: [ 'lowercase', 'asciifolding' ],
        },
        phone_analyzer: { 
          type: 'custom',
          tokenizer: 'whitespace',
          filter: [ 'asciifolding', 'phone_filter', 'phoneclean_filter', 'search_filter' ]
        },
        search_phone_analyzer: { 
          type: 'custom',
          tokenizer: 'whitespace',
          filter: [ 'asciifolding', 'phone_filter', 'phoneclean_filter' ]
        },
        email_analyzer: {
          type: 'custom',
          tokenizer: 'whitespace',
          filter: [ 'asciifolding', 'email_filter', 'lowercase',  'unique' ]
        }
      }
    }
  }
end