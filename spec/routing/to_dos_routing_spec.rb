# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ToDosController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/api/users/1/to_dos').to route_to('to_dos#index', user_id: '1')
    end

    it 'routes to #show' do
      expect(get: '/api/users/1/to_dos/1').to route_to('to_dos#show', user_id: '1', id: '1')
    end

    it 'routes to #create' do
      expect(post: '/api/users/1/to_dos').to route_to('to_dos#create', user_id: '1')
    end

    it 'routes to #update via PUT' do
      expect(put: '/api/users/1/to_dos/1').to route_to('to_dos#update', user_id: '1', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/api/users/1/to_dos/1').to route_to('to_dos#destroy', user_id: '1', id: '1')
    end
  end
end
