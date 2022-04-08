class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.string :zip,   :null => false, :limit => 6
      t.string :location,   :null => false, :limit => 30
      t.string :street,   :null => false, :limit => 50
      t.string :house,   :null => false, :limit => 5
      t.string :room,   :null => false, :limit => 5

      t.timestamps
    end

    add_index :addresses, [:zip, :location, :street, :house, :room], unique: true, name: 'address_index'
  end
end
