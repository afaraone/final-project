class AddCalendaridToToDo < ActiveRecord::Migration[5.2]
  def change
    add_column :to_dos, :event, :string
  end
end
