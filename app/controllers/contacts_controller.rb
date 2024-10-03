class ContactsController < ApplicationController
  def show
    request.variant = :detail
    @contact = Contact.find params[:id]

    respond_to do |format|
      format.html
    end
  end
end