# frozen_string_literal: true

# For ToDos with a scheduled start time
class TimedToDo < ToDo
  validates :start_time, :end_time, presence: true
end
