# frozen_string_literal: true

class User < ApplicationRecord
  validates :email, uniqueness: true
  validates :email, presence: true
  has_many :to_dos
  has_many :timed_to_dos
  has_many :simple_to_dos
  accepts_nested_attributes_for :to_dos
end
