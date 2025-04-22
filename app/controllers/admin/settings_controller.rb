# class Admin::SettingsController < AdminController
#   def show
#     @settings = Phonebook.config
#   end

#   def update
#     Phonebook.config.update(settings_params.to_h)

#     respond_to do |format|
#       format.html { redirect_to admin_settings_path, notice: 'Settings was successfully updated.' }
#       format.json { render :show, status: :ok, location: @contact }
#     end
#   end

#   def access_control
#     head(:forbidden) unless current_user.has_role?(:admin)
#   end

#   def settings_params
#     settings = params.require(:settings)
#     settings[:autosort][:title_rules] = settings[:autosort][:title_rules].split("\n").map{|l| l.strip} if settings[:autosort] && settings[:autosort][:title_rules]
#     settings[:autosort][:department_rules] = settings[:autosort][:department_rules].split("\n").map{|l| l.strip} if settings[:autosort] && settings[:autosort][:department_rules]
#     settings.permit(:title, :default_page, asterisk: [:enable, :host, :username, :password, :number_type], autosort: [:title, :department, title_rules: [], department_rules: []])
#   end
# end

class Admin::SettingsController < AdminController
  # before_action { authorize(:setting) }

  def edit
  end

  def update
    @errors = ActiveModel::Errors.new(self)
    setting_params.keys.each do |key|
      next if setting_params[key].nil?

      setting = Setting.new(var: key)
      setting.value = setting_params[key].strip
      unless setting.valid?
        @errors.merge!(setting.errors)
      end
    end

    if @errors.any?
      render :edit
    end

    setting_params.keys.each do |key|
      Setting.send("#{key}=", setting_params[key].strip) unless setting_params[key].nil?
    end

    redirect_to [:admin, :settings], notice: "General setting was successfully updated."
  end

  private

  def setting_params
    params.require(:setting).permit(
      :title,
      :mailer_sender, :address, :port, :user_name, :password, :enable_starttls
    )
  end
end