# frozen_string_literal: true

require 'test_helper'

class ToDosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @to_do = to_dos(:one)
  end

  test 'should get index' do
    get to_dos_url, as: :json
    assert_response :success
  end

  test 'should create to_do' do
    assert_difference('ToDo.count') do
      post to_dos_url, params: { to_do: { body: @to_do.body, garden_id: @to_do.garden_id, title: @to_do.title } }, as: :json
    end

    assert_response 201
  end

  test 'should show to_do' do
    get to_do_url(@to_do), as: :json
    assert_response :success
  end

  test 'should update to_do' do
    patch to_do_url(@to_do), params: { to_do: { body: @to_do.body, garden_id: @to_do.garden_id, title: @to_do.title } }, as: :json
    assert_response 200
  end

  test 'should destroy to_do' do
    assert_difference('ToDo.count', -1) do
      delete to_do_url(@to_do), as: :json
    end

    assert_response 204
  end
end
