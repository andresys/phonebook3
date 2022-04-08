class Api::V1::HelpsController < ApplicationController
  def show
    render html: Phonebook.help.render
  end
end