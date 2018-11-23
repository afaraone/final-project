class AddCalendarToTodos < ActiveRecord::Migration[5.2]
  def change
    add_column :to_dos, :calendar, :string
  end
end
