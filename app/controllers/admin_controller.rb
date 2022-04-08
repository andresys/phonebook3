class AdminController < ProfileController
  def access_control
    head(:forbidden) unless current_user.has_role?(:admin) || current_user.has_role?(:manager)
  end
end