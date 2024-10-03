class ExportsController < ApplicationController
  include Pagy::Backend
  before_action :set_export, only: [:show]

  def index
    @pagy, @exports = pagy Export.order created_at: :desc

    respond_to do |format|
      format.html
    end
  end

  def new
    @export = Export.new
  end

  def create
    success, @export = Exports::CreateService.call export_params
    
    respond_to do |format|
      if success
        format.html { redirect_to [:exports], notice: 'Export was successfully created.' }
      else
        format.html { render :new }
      end
    end
  end

  def show
  end

  def destroy_all
    exports = Export.where(id: export_params[:id])

    respond_to do |format|
      if exports.delete_all
        format.html { redirect_to [:exports], notice: 'Exports was successfully deleted.' }
      else
        format.html { redirect_to [:exports] }
      end
    end
  end

  
  private

  def set_export
    @exprot = Export.find(params[:id])
  end

  def export_params
    params.require(:export).permit(id: [])
  end

  def respond_as_zip
    compresed_filestream = Zip::OutputStream.write_buffer do |zos|
      zos.put_next_entry 'contacts.xlsx'
      zos.print render_to_string(
        layout: false, handlers: [:axlsx], formats: [:xlsx],
        template: 'contacts/export',
        locals: { contacts: contacts }
      )
    end
    compresed_filestream.rewind
    send_data compresed_filestream.read, filename: 'contacts.zip'
  end
end