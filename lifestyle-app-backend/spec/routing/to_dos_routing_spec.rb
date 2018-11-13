# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ToDosController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/to_dos').to route_to('to_dos#index')
    end

    it 'routes to #show' do
      expect(get: '/to_dos/1').to route_to('to_dos#show', id: '1')
    end

    it 'routes to #create' do
      expect(post: '/to_dos').to route_to('to_dos#create')
    end

    it 'routes to #update via PUT' do
      expect(put: '/to_dos/1').to route_to('to_dos#update', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/to_dos/1').to route_to('to_dos#destroy', id: '1')
    end
  end
end
