class CreateDepartments < ActiveRecord::Migration[5.2]
  def change
    create_table :departments do |t|
      t.string :name,   :null => false

      t.string :format

      t.integer :parent_id, :null => true, :index => true
      t.integer :lft, :null => false, :index => true
      t.integer :rgt, :null => false, :index => true

      t.integer :depth, :null => false, :default => 0
      t.integer :children_count, :null => false, :default => 0

      t.string :slug

      t.timestamps
    end
  end
end
