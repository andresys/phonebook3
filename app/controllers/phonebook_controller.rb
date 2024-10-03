class PhonebookController < ApplicationController
  def search
    @results = Searchkick.search(body: {
      query: {
        multi_match: {
          query: query,
          fields: [
            'firstname.text',
            'lastname.text',
            'middlename.text',
            'title.text',
            'slug.keyword',
            'name.text',
            'name.abbr'
          ],
          type: "cross_fields",
          operator: "and",
          zero_terms_query: "all"
        }
      }},
      models: [Contact, Department]
    )

    unless is_item = @results.hits.count == 1
      @results = Contact.sk_search(query)
      @pagy, @results = pagy_searchkick @results
    end
    
    respond_to do |format|
      format.html {
        redirect_to [@results.first] if is_item || @pagy.count == 1
      }
      format.turbo_stream
    end
  end

  def autocomplete
    request.variant = :item

    @results = Searchkick.search(body: {
      query: {
        multi_match: {
          query: params[:q],
          fields: ['firstname.text', 'lastname.text', 'middlename.text', 'name.text', 'name.abbr'],
          type: "cross_fields",
          operator: "and",
          zero_terms_query: "all"
        }
      }},
      limit: 10,
      load: true,
      models: [Contact, Department]
    )

    respond_to do |format|
      format.html {  }
    end
  end

  private

  def query
    q = params[:q].to_s.strip
    !q.empty? && q || '*'
  end
end
