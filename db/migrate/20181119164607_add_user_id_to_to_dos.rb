class AddUserIdToToDos < ActiveRecord::Migration[5.2]
  def change
    add_column :to_dos, :user_id, :integer
  end
end
