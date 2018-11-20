class CreateToDos < ActiveRecord::Migration[5.2]
  def change
    create_table :to_dos do |t|
      t.integer :garden_id
      t.string :title
      t.string :body
      t.string :type, null: false
      t.datetime :start_time
      t.datetime :end_time
      t.timestamps
    end
  end
end
