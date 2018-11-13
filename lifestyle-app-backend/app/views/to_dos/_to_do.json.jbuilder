# frozen_string_literal: true

json.extract! to_do, :id, :garden_id, :title, :body, :created_at, :updated_at
json.url to_do_url(to_do, format: :json)
