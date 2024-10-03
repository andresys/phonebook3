class DepartmentsController < ApplicationController
  def show
    results = Contact.sk_search params[:id]
    @pagy, @results = pagy_searchkick results

    respond_to do |format|
      format.html
      format.turbo_stream
    end
  end
end