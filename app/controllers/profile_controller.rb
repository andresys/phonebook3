class ProfileController < ApplicationController
  before_action :authenticate_user!
  before_action :access_control

  def access_control
    head(:forbidden) unless current_user.contact
  end
end
