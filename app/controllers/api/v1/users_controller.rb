class Api::V1::UsersController < ApplicationController
  def show
    # render json: current_user || {}
    respond_to do |format|
      format.json
    end
  end
end