class AddCompleteToToDos < ActiveRecord::Migration[5.2]
  def change
    add_column :to_dos, :complete, :boolean, default: false
  end
end
