class Admin::ContactsController < AdminController
  before_action :set_contact, only: [:show, :edit, :update, :destroy]

  # GET /contacts
  # GET /contacts.json
  def index
    @contacts = Contact.all
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
        format.json { render :show, status: :created, location: @contact }
      else
        format.html { render :new }
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /contacts/1
  # PATCH/PUT /contacts/1.json
  def update
    respond_to do |format|
      if @contact.update(contact_params)
        @contact.image.reprocess! if @contact.cropping?
        format.html { redirect_to admin_contacts_path, notice: 'Contact was successfully updated.' }
        format.json { render :show, status: :ok, location: @contact }
      else
        format.html { render :edit }
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /contacts/1
  # DELETE /contacts/1.json
  def destroy
    @contact.destroy
    respond_to do |format|
      format.html { redirect_to admin_contacts_path, notice: 'Contact was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contact
      @contact = Contact.find(params[:id])
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
    end
end
