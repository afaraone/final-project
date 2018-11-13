# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ToDo, type: :model do
  describe 'title' do
    it 'cannot be blank' do
      todo = ToDo.new(title: '', body: 'test')
      expect(todo.valid?).to eq false
    end
  end

  describe 'body' do
    it 'cannot be blank' do
      todo = ToDo.new(title: 'test', body: '')
      expect(todo.valid?).to eq false
    end
  end
end
