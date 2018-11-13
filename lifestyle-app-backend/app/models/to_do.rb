# frozen_string_literal: true

class ToDo < ApplicationRecord
  validates :body, :title, presence: true
end
