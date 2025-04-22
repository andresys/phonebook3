class HelpsController < ApplicationController
  def show
    @help = Phonebook.help.render
  end
end