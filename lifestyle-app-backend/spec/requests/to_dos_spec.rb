require 'rails_helper'

RSpec.describe "ToDos", type: :request do
  describe "GET /to_dos" do
    it "works! (now write some real specs)" do
      get to_dos_path
      expect(response).to have_http_status(200)
    end
  end
end
