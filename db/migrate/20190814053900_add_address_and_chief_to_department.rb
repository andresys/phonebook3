class AddAddressAndChiefToDepartment < ActiveRecord::Migration[5.2]
  def change
    add_column :departments, :address_id, :integer
    add_column :departments, :chief_id, :integer
  end
end
