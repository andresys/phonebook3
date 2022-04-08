class Admin::SettingsController < AdminController
  def show
    @settings = Phonebook.config
  end

  def update
    Phonebook.config.update(settings_params.to_h)

    respond_to do |format|
      format.html { redirect_to admin_settings_path, notice: 'Settings was successfully updated.' }
      format.json { render :show, status: :ok, location: @contact }
    end
  end

  def access_control
    head(:forbidden) unless current_user.has_role?(:admin)
  end

  def settings_params
    settings = params.require(:settings)
    settings[:autosort][:title_rules] = settings[:autosort][:title_rules].split("\n").map{|l| l.strip} if settings[:autosort] && settings[:autosort][:title_rules]
    settings[:autosort][:department_rules] = settings[:autosort][:department_rules].split("\n").map{|l| l.strip} if settings[:autosort] && settings[:autosort][:department_rules]
    settings.permit(:title, :default_page, asterisk: [:enable, :host, :username, :password, :number_type], autosort: [:title, :department, title_rules: [], department_rules: []])
  end
end