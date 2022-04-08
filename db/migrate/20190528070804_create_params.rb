class CreateParams < ActiveRecord::Migration[5.2]
  def change
    create_table :params do |t|
      t.string :name,   :null => false
      t.string :value,   :null => false
      t.string :param_type,   :null => false

      t.integer :paramable_id
      t.string  :paramable_type, :limit => 50

      t.timestamps
    end

    add_index :params, [:paramable_type, :paramable_id]
  end
end
