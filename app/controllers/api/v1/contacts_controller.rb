class Api::V1::ContactsController < ApplicationController
  def index
    p "---------------"
    @user = current_user
    p @user
    from = params[:from] || 0
    limit = params[:limit] || 50

    session[:favorite] = current_user && {on: true, off: false}[params[:favorite].to_sym] unless params[:favorite].nil?

    global_favorite = {favorites: true, contacts: false, sessions: session[:favorite]}[Phonebook.config.default_page.to_sym]
    user_favorite = {favorites: true, contacts: false, sessions: session[:favorite], globals: global_favorite}["globals".to_sym]

    @favorite = params[:favorite].nil? ? user_favorite : session[:favorite]
    fav_list = @favorite && current_user && current_user.favorites.map(&:id)

    where = "true"
    unless params[:q].blank? && !@favorite
      res = Contact.search(params[:q], fav_list)
      cid = res[0].first unless res.blank? || res[0].count != 1
      cids = res.flatten - ([cid] || [])
      @contact = Contact.find_by_id(cid) if cid
      where = cids.count > 0 ? "contacts.id IN (#{cids.join(',')})" : "false"
    end

    @contacts = Contact.find_by_sql('SELECT  contacts.*, CONCAT(\'[\',GROUP_CONCAT(DISTINCT contacts_users.user_id SEPARATOR \', \'),\']\') as favorite, TRIM(CONCAT(contacts.lastname, \' \', contacts.firstname, \' \', contacts.middlename)) as name, titles.name as title_name, departments.name as department_name, CONCAT(\'{\',GROUP_CONCAT(params.param_value SEPARATOR \', \'),\'}\') as json_params
                                    FROM contacts
                                    LEFT JOIN contacts_users ON contacts_users.contact_id = contacts.id
                                    INNER JOIN titles ON titles.id = contacts.title_id
                                    INNER JOIN departments ON departments.id = contacts.department_id
                                    INNER JOIN (SELECT paramable_type, paramable_id, CONCAT(\'"\',param_type,\'": [\',GROUP_CONCAT(CONCAT(\'{"type":"\',params.name,\'","value":"\',params.value,\'"}\') SEPARATOR \', \'),\']\') as param_value
                                                FROM params
                                                GROUP BY paramable_type, paramable_id, param_type) as params ON params.paramable_id = contacts.id AND params.paramable_type = \'Contact\'
                                    WHERE ' + where + '
                                    GROUP BY contacts.id
                                    ORDER BY departments.lft ASC, titles.position ASC, lastname ASC, firstname ASC, middlename ASC LIMIT ' + limit + ' OFFSET ' + from)

    #render json: Contact.all
    #render json: @contacts.map {|c| c.attributes.merge(:img_url => c.image(:small))}
    #render params[:template] #rescue render json: {error: "Unknown template"}

    error_message = "Unknown template"
    @filename = 'freepbx_phonebook.csv'
    @output_encoding = 'UTF-8'
    @csv_options = { :force_quotes => true, :col_sep => ';' }

    respond_to do |format|
      format.xml {render params[:template] rescue render xml: "<error>#{error_message}</error>"}
      format.json {render params[:template] rescue render json: {error: error_message}}
      format.csv {render params[:template] rescue send_data error_message, filename: @filename}
    end
  end

  def create
    @contact = Contact.create(contact_params)
    render json: @contact
  end

  def show
    @contact = Contact.find(params[:id])

    respond_to do |format|
      format.json
      format.vcf do
        response.headers['Content-Disposition'] = "attachment; filename=\"#{@contact.to_s}.vcf\""
        render nil, content_type: 'text/vcard; charset=windows-1251'
      end
      format.png do
        #response.headers['Content-Disposition'] = "attachment; filename=\"#{@contact.to_s}.png\""
        render params[:template] || 'qrcode', content_type: 'image/png'
      end
    end
  end

  def destroy
    Contact.destroy(params[:id])
  end

  def update
    @contact = Contact.find(params[:id])
    @contact.update_attributes(contact_params)
    render json: @contact
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def contact_params
      contact = params.require(:contact)
      
      contact[:department_id] = contact[:deps].values.reject { |d| d.empty? }.reduce([]) do |deps, d|
        deps << Department.find_or_create_by(id: d) do |dep|
          dep.id = nil
          dep.name = d
          dep.parent_id = deps.last.id
        end
      end.last.id if contact[:deps]

      contact[:title_id].strip!
      contact[:title_id] = (Title.where("id = ? or name = ?", contact[:title_id], contact[:title_id]).first || Title.create(name: contact[:title_id])).id

      contact.permit(:lastname, :firstname, :middlename, :department_id, :title_id, :address_id, :location, :zip, :street, :house, :room, :image, :crop_x, :crop_y, :crop_w, :crop_h, :delete_image, params: [:id, :name, :value, :type])
    end
end