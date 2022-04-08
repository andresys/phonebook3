class ApplicationController < ActionController::Base
  layout proc { false if request.xhr? }

  def client
    render html: "", layout: "client"
  end

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end
end
