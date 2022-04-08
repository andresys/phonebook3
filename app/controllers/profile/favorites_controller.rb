class Profile::FavoritesController < ProfileController
  def toggle
    @contact = Contact.find(params[:id])
    if current_user && @contact
      if current_user.has_favorite?(@contact)
        current_user.favorites.delete(@contact)
      else
        current_user.favorites << @contact
      end
    end
  end
end