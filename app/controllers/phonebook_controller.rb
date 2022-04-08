class PhonebookController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :preview

  def react
    gon.title = !Phonebook.config.title.blank? && Phonebook.config.title
    gon.version = Rails.application.config.version
  end

  def contacts
    session[:favorite] = current_user && {on: true, off: false}[params[:favorite].to_sym] unless params[:favorite].nil?

    global_favorite = {favorites: true, contacts: false, sessions: session[:favorite]}[Phonebook.config.default_page.to_sym]
    user_favorite = {favorites: true, contacts: false, sessions: session[:favorite], globals: global_favorite}["globals".to_sym]

    @favorite = params[:favorite].nil? ? user_favorite : session[:favorite]
    fav_list = @favorite && current_user && current_user.favorites.map(&:id)

    unless params[:q].blank? && !@favorite
      res = Contact.search(params[:q], fav_list)
      @cid = res[0].first unless res.blank? || res[0].count != 1
      @cids = res.flatten - ([@cid] || [])
      # @cids = res[0].flatten || [] unless res.blank? || @cid
      @dids = Department.find(Contact.find(@cids).pluck(:department_id).uniq).map(&:self_and_ancestors).flatten.map(&:id).uniq
      @query = params[:q]
    end

    @contacts = Contact.find_by_sql('SELECT  contacts.*, CONCAT(\'[\',GROUP_CONCAT(DISTINCT contacts_users.user_id SEPARATOR \', \'),\']\') as favorite, TRIM(CONCAT(contacts.lastname, \' \', contacts.firstname, \' \', contacts.middlename)) as name, titles.name as title_name, departments.name as department_name, CONCAT(\'{\',GROUP_CONCAT(params.param_value SEPARATOR \', \'),\'}\') as json_params
                                    FROM contacts
                                    LEFT JOIN contacts_users ON contacts_users.contact_id = contacts.id
                                    INNER JOIN titles ON titles.id = contacts.title_id
                                    INNER JOIN departments ON departments.id = contacts.department_id
                                    INNER JOIN (SELECT paramable_type, paramable_id, CONCAT(\'"\',param_type,\'": [\',GROUP_CONCAT(CONCAT(\'{"type":"\',params.name,\'","value":"\',params.value,\'"}\') SEPARATOR \', \'),\']\') as param_value
                                                FROM params
                                                GROUP BY paramable_type, paramable_id, param_type) as params ON params.paramable_id = contacts.id AND params.paramable_type = \'Contact\'
                                    GROUP BY contacts.id
                                    ORDER BY departments.lft ASC, titles.position ASC, lastname ASC, firstname ASC, middlename ASC LIMIT 100')  unless request.xhr? #LIMIT 5
    #@contacts_json = render_to_string( template: 'api/v1/contacts/index.json.jbuilder' )

    respond_to do |format|
      format.html
      format.json
    end
  end

  def help
    @help = Phonebook.help.render

    respond_to do |format|
      format.html
      format.json {
        render json: {}
      }
    end
  end

  def preview
    render html: Phonebook.help.render(params[:content])
  end

  #def template
  #end

private
  def search(text, ids)
    Contact.search do
      fulltext text do
        fields :firstname, :lastname, :middlename, :title, :department, :abbr, :address, :params
      end
      with(:id, ids)
    end.results.map(&:id)
  end

  def search_substr(text, ids)
    Contact.search do
      fulltext text do
        fields :firstname_substr, :lastname_substr, :middlename_substr, :title_substr, :department_substr, :address_substr, :params_substr
      end
      with(:id, ids) 
    end.results.map(&:id)
  end
end
