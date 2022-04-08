class Admin::HelpsController < AdminController
  def show
    @help = Phonebook.help
  end

  def update
    Phonebook.help.update(helps_params.to_h)

    respond_to do |format|
      format.html { redirect_to admin_help_path, notice: 'Help was successfully updated.' }
      format.json { render :show, status: :ok, location: @contact }
    end
  end

  def access_control
    head(:forbidden) unless current_user.has_role?(:admin)
  end

  def helps_params
    params.require(:helps).permit(:text)
  end
end