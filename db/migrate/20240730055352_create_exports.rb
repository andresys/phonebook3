class CreateExports < ActiveRecord::Migration[7.1]
  def change
    create_table :exports do |t|
      t.belongs_to :user, null: true, foreign_key: true

      t.timestamps
    end
  end
end
