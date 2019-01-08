require 'test_helper'

class WeaponsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @weapon = weapons(:one)
  end

  test "should get index" do
    get weapons_url, as: :json
    assert_response :success
  end

  test "should create weapon" do
    assert_difference('Weapon.count') do
      post weapons_url, params: { weapon: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show weapon" do
    get weapon_url(@weapon), as: :json
    assert_response :success
  end

  test "should update weapon" do
    patch weapon_url(@weapon), params: { weapon: {  } }, as: :json
    assert_response 200
  end

  test "should destroy weapon" do
    assert_difference('Weapon.count', -1) do
      delete weapon_url(@weapon), as: :json
    end

    assert_response 204
  end
end
