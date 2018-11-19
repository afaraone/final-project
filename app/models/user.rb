class User < ApplicationRecord
  validates :email, uniqueness: true
  has_many :to_dos
  accepts_nested_attributes_for :to_dos
end
