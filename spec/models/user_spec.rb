# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'email' do
    it 'gets saved if name and email present' do
      user = User.new(name: "testname", email: "testemail")
      expect(user.valid?).to eq true
    end
    it 'must be unique' do
      User.create(name: "testname", email: "testemail")
      user = User.new(name: "testname", email: "testemail")
      expect(user.valid?).to eq false
    end
  end
end
