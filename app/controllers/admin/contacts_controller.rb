class Admin::ContactsController < AdminController
  before_action :set_contact, only: [:show, :edit, :update, :destroy]

  # GET /contacts
  # GET /contacts.json
  def index
    results = Contact.pagy_search(body: {
      sort: [
        { lastname: 'asc' },
        { firstname: 'asc' },
        { middlename: 'asc' },
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
    @pagy, @contacts = pagy_searchkick results

    respond_to do |format|
      format.html {
        redirect_to [:admin, @contacts.first] if @pagy.count == 1
      }
      format.turbo_stream
    end
  end

  # GET /contacts/1
  # GET /contacts/1.json
  def show
  end

  # GET /contacts/new
  def new
    @contact = Contact.new
  end

  # GET /contacts/1/edit
  def edit
  end

  # POST /contacts
  # POST /contacts.json
  def create
    @contact = Contact.new(contact_params)

    respond_to do |format|
      if @contact.save
        @contact.image.reprocess! if @contact.cropping?
        
        format.html { redirect_to admin_contacts_path, notice: 'Contact was successfully created.' }
      else
        format.html { render :new }
      end
    end
  end

  # PATCH/PUT /contacts/1
  # PATCH/PUT /contacts/1.json
  def update
    respond_to do |format|
      if @contact.update(contact_params)
      #   @contact.image.reprocess! if @contact.cropping?
        format.html { redirect_to admin_contacts_path, notice: 'Contact was successfully updated.' }
      else
        format.html { render :edit }
      end
    end
  end

  # DELETE /contacts/1
  # DELETE /contacts/1.json
  def destroy
    @contact.destroy
    respond_to do |format|
      format.html { redirect_to admin_contacts_path, notice: 'Contact was successfully destroyed.' }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contact
      @contact = Contact.find(params[:id])
    end

    def query
      q = params[:q].to_s.strip
      !q.empty? && q || '*'
    end

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
      params.require(:contact).permit(:lastname, :firstname, :middlename,
        :location, :zip, :street, :house, :room,
        params_attributes: [:id, :name, :value, :param_type, :_destroy]
      )
      # params.require(:contact).permit(:lastname, :firstname, :middlename)
    end
end
