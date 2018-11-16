class SimpleToDo < ToDo
  validates :end_time, :start_time, absence: true
end
