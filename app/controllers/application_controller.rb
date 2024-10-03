class ApplicationController < ActionController::Base
  include Pagy::Backend
  include ActiveStorage::SetCurrent
  
  protect_from_forgery prepend: true
  #protect_from_forgery with: :null_session
  #protect_from_forgery unless: -> { request.format.json? }
  
  layout proc { false if request.xhr? }
end
