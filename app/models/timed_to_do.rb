class TimedToDo < ToDo
  validates :start_time, :end_time, presence: true
end
