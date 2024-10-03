module Settings::DepartmentSearch
  extend ActiveSupport::Concern

  included do
    extend Pagy::Searchkick

    # searchkick index_name: 'phonebook_contacts', language: "Russian",
    #   filterable: [:id, :department_id], word_start: [:name, :department_name, :title_name]
    searchkick index_name: 'phonebook_department', mappings: {
      properties: {
        name: {
          type: 'keyword',
          fields: { 
            text: {
              type: 'text',
              analyzer: 'text_analyzer',
              search_analyzer: 'search_text_analyzer'
            },
            abbr: {
              type: 'text',
              analyzer: 'abbr_analyzer',
              search_analyzer: 'search_text_analyzer'
            }
          }
        },
        slug: {
          type: 'keyword',
          fields: {
            keyword: {
              type: 'text',
              analyzer: 'keyword_analyzer',
            }
          }
        },
        sort: { type: 'integer', index: false },
        phones: {
          type: 'keyword',
          fields: {
            phone: {
              type: 'text',
              analyzer: 'phone_analyzer',
              search_analyzer: 'search_phone_analyzer'
            }
          }
        },
        emails: {
          type: 'keyword',
          fields: {
            email: {
              type: 'text',
              analyzer: 'email_analyzer'
            }
          }
        }
      }
    }, settings: Settings::SETTINGS
    
    def search_data
      {
        name: name,
        slug: slug,
        sort: lft,
        phones: params.where(param_type: "phone").pluck(:value),
        emails: params.where(param_type: "email").pluck(:value)
      }
    end

    def self.sk_search query
      # pagy_search(query, order: 'name')
      pagy_search(body: {
        sort: [
          { sort: 'asc' },
          '_score'
        ],
        query: {
          multi_match: {
            query: query,
            type: "cross_fields",
            operator: "and",
            zero_terms_query: "all"
          }
        },
      })
    end
  end
end