class SearchIndex < ActiveRecord::Migration[5.2]
  def change
    create_table :searches_indexes, id: false do |t|
      t.string :value
      t.integer :contact_id
    end

    add_index(:searches_indexes, :value)
  end
end
