class AddFavoriteToUser < ActiveRecord::Migration[5.2]
  def change
    create_table :contacts_users, id: false do |t|
      t.integer :user_id
      t.integer :contact_id
    end
  end
end
