class CreateContacts < ActiveRecord::Migration[5.2]
  def change
    create_table :contacts do |t|
      t.string :firstname,   :null => false
      t.string :lastname,   :null => false
      t.string :middlename

      t.integer :department_id,   :null => false
      t.integer :title_id,   :null => false
      t.text :address

      #Paperclip image
      t.string :image_file_name
      t.string :image_content_type
      t.integer :image_file_size
      t.datetime :image_updated_at

      #Paperclip croping
      t.integer :crop_x
      t.integer :crop_y
      t.integer :crop_w
      t.integer :crop_h

      t.string :slug

      t.timestamps
    end
  end
end
