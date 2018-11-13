class CreateToDos < ActiveRecord::Migration[5.2]
  def change
    create_table :to_dos do |t|
      t.integer :garden_id
      t.string :title
      t.string :body

      t.timestamps
    end
  end
end
